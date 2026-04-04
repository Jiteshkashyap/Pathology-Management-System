import AppointmentModel from "../models/appointmentModel.js";
import redisClient from "../config/redis.js";
import { SLOTS } from "../utils/slots.js";
import { getChannel } from "../config/rabbitmq.js";
import UserModel from "../models/userModel.js";
import { createAuditLog } from "./auditService.js";


const MAX_PER_SLOT = 5;

export const getAvailableSlots = async (date) => {
  const start = new Date(date);
  start.setUTCHours(0,0,0,0);

  const end = new Date(date);
  end.setUTCHours(23,59,59,999);


  console.log("Date received:", date);
  const appointments = await AppointmentModel.aggregate([
    {
      $match: {
        appointmentDate: {
          $gte: start,
          $lte: end
        },
        status: "booked"
      }
    },
    {
      $group: {
        _id: "$slotTime",
        count: { $sum: 1 }
      }
    }
  ]);

  const slotMap = {};

  appointments.forEach((s) => {
    slotMap[s._id] = s.count;
  });

  return SLOTS.map((slot) => ({
    slot,
    available: (slotMap[slot] || 0) < MAX_PER_SLOT,
    bookedCount: slotMap[slot] || 0
  }));
};

export const bookAppointment = async (data) => {
  const { appointmentDate, slotTime, patient } = data;

  const lockKey = `slot:${appointmentDate}:${slotTime}`;

  const lock = await redisClient.set(lockKey, "locked", {
    NX: true,
    EX: 120,
  });

  if (!lock) {
    throw new Error("Slot is being Booked! Try again");
  }

  try {
    const count = await AppointmentModel.countDocuments({
      appointmentDate: new Date(appointmentDate),
      slotTime,
      status: "booked",
    });

    if (count >= MAX_PER_SLOT) {
      throw new Error("Slot is full");
    }

    /*  NEW LOGIC (MULTI TEST SUPPORT) */

    const appointmentData = {
      appointmentDate,
      slotTime,
      patient,
    };

    const incomingTests = data.test || data.tests;

if (data.package) {
  appointmentData.package = data.package;
} 
else if (incomingTests && incomingTests.length > 0) {
  appointmentData.tests = Array.isArray(incomingTests)
    ? incomingTests
    : [incomingTests];
} 
else {
  throw new Error("Either test or package must be selected");
}
    const appointment = await AppointmentModel.create(appointmentData);


    await createAuditLog({
      action: "APPOINTMENT_BOOKED",
      user: { id: data.patient, role: "patient" },
      resourceType: "Appointment",
      resourceId: appointment._id,
      metadata: {
        slot: appointment.slotTime,
        date: appointment.appointmentDate,
      },
    });

    const patientData = await UserModel.findById(patient);

    const channel = getChannel();

    if (channel && patientData?.email) {
      channel.sendToQueue(
        "appointmentEmailQueue",
        Buffer.from(
          JSON.stringify({
            email: patientData.email,
            date: appointment.appointmentDate,
            slot: appointment.slotTime,
            appointmentId: appointment._id,
          })
        )
      );
    }

    return appointment;
  } finally {
    await redisClient.del(lockKey);
  }
};

export const getMyAppointments= async(patientId)=>{
    return await AppointmentModel.find({patient:patientId})
    .populate("tests", "name category")
    .populate("package", "name")
    .sort({ appointmentDate: -1});
}

export const cancelAppointment = async(id , patientId)=>{
    const appointment = await AppointmentModel.findOne({
        _id:id,
        patient: patientId
    })
    if(!appointment) throw new Error ('Appointment not found');

    appointment.status='cancelled';
    await appointment.save();

    return appointment;
}

export const getAllAppointments = async ({
  date,
  status,
  page = 1,
  limit = 10,
}) => {
  const query = {};

  if (date) {
    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    query.appointmentDate = {
      $gte: selectedDate,
      $lt: nextDate,
    };
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    AppointmentModel.find(query)
      .populate("patient", "name email age")
      .populate("tests", "name category")
      .populate({
       path: "package",
       select: "name tests",
       populate: {
         path: "tests",
         select: "name category unit normalRange"
       }
     })
      .sort({ appointmentDate: 1, slotTime: 1 })
      .skip(skip)
      .limit(limit),

    AppointmentModel.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateAppointmentStatus = async (id, status) => {
  const appointment = await AppointmentModel.findById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.status = status;
  await appointment.save();

  return appointment;
};