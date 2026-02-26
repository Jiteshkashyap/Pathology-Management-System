import Joi from "joi";

export const createDoctorSchema = Joi.object({
  name: Joi.string().required(),
  specialization: Joi.string().required(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .messages({
      'string.length': 'Phone number must be exactly 10 digits.',
      'string.pattern.base': 'Phone number must only contain digits.'}).optional()

});

export const updateDoctorSchema = Joi.object({
  name: Joi.string().optional(),
  specialization: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .messages({
      'string.length': 'Phone number must be exactly 10 digits.',
      'string.pattern.base': 'Phone number must only contain digits.'}).optional(),
  isActive: Joi.boolean().optional(),
});