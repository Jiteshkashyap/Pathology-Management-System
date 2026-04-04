import Joi from "joi";

export const bookAppointmentSchema = Joi.object({
  test: Joi.array().items(Joi.string()).optional(),
  package: Joi.string().optional(),
  appointmentDate: Joi.date().required(),
  slotTime: Joi.string().required(),
});

export const updateAppointmentStatusSchema = Joi.object({
  status: Joi.string()
    .valid("booked", "completed", "cancelled")
    .required(),
});