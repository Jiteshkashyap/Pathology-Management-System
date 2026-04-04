import Joi from "joi";

export const createReportSchema = Joi.object({
  patient:Joi.string().optional(),
  patientName: Joi.string(),
  patientEmail: Joi.string().email().optional(),
  patientAge: Joi.number(),
  appointmentId: Joi.string().optional(),
  doctor: Joi.string().required(),
  tests: Joi.array().items(Joi.string()).single().optional(),
  packageId: Joi.string().optional()
});

export const updateResultsSchema = Joi.object({
  results: Joi.array().items(
    Joi.object({
      testId: Joi.string().required(),
      result: Joi.number().required()
    })
  ).required()
});