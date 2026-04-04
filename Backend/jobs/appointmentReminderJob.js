import cron from "node-cron";
import AppointmentModel from "../models/appointmentModel.js";
import { getChannel } from "../config/rabbitmq.js";
import UserModel from "../models/userModel.js";

export const startAppointmentReminderJob = () => {

  // Runs every day at 8 AM
  cron.schedule("0 8 * * *", async () => {
    console.log("Running Appointment Reminder Job...");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);

    const appointments = await AppointmentModel.find({
      appointmentDate: {
        $gte: tomorrow,
        $lt: nextDay,
      },
      status: "booked",
    });

    const channel = getChannel();

    for (const appointment of appointments) {
      const patient = await UserModel.findById(appointment.patient);

      if (channel && patient?.email) {
        channel.sendToQueue(
          "appointmentEmailQueue",
          Buffer.from(
            JSON.stringify({
              email: patient.email,
              date: appointment.appointmentDate,
              slot: appointment.slotTime,
              type: "reminder", // optional
              appointmentId: appointment._id,
            })
          )
        );
      }
    }

    console.log(`Sent ${appointments.length} reminder jobs`);
  });
};