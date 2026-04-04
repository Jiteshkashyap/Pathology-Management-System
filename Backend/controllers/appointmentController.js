import { bookAppointment,
getAvailableSlots,
getMyAppointments ,
cancelAppointment,
getAllAppointments,
updateAppointmentStatus } from "../services/appointmentService.js";

export const getAvailableSlotsHandler= async(req,res)=>{
    
    try {
        const {date} = req.query

        const slots = await getAvailableSlots(date);

        res.status(200).json({
            message:'Available Slots present',
            data:slots
        })

    } catch (error) {
        res.status(400).json({ message:error.message})
    }
}

export const bookAppointmentHandler = async(req,res,next)=>{
    try {

        const appointment = await bookAppointment({
            ...req.body,
            patient:req.user.id
        })

        res.status(201).json({
            message:"Appointment Booked Succesfully",
            data:appointment
        })
        
    } catch (error) {
        // return res.status(400).json({message:error.message})
        next(error)
    }
}

export const getMyAppointmentHandler = async (req,res)=>{
    try {
        const appointments = await getMyAppointments(req.user.id);

        res.status(200).json({
            message:"Appointment Fetched Succesfully",
            data:appointments
        })
        
    } catch (error) {
        res.status(400).json({ message:error.message})
    }
}

export const cancelAppointmentHandler = async (req,res)=>{
    try {

        const appointment = await cancelAppointment(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            message:"Appointments Cancelled",
            data:appointment
        })
        
    } catch (error) {
        res.status(400).json({ message:error.message})
    }
}


export const getAllAppointmentsHandler = async (req, res) => {
  try {
    const { date, status, page = 1, limit = 10 } = req.query;

    const result = await getAllAppointments({
      date,
      status,
      page: Number(page),
      limit: Number(limit),
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAppointmentStatusHandler = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await updateAppointmentStatus(
      req.params.id,
      status
    );

    res.json({
      message: "Appointment status updated",
      data: appointment,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};