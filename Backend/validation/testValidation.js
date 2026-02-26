import Joi from "joi";

export const createTestSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  unit: Joi.string().required(),
  normalRange: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required()
  }).required(),
  price: Joi.number().required()
});

export const updateTestSchema = Joi.object({
  name: Joi.string().optional(),
  category: Joi.string().optional(),
  unit: Joi.string().optional(),
  normalRange: Joi.object({
    min: Joi.number().optional(),
    max: Joi.number().optional()
  }).optional(),
  price: Joi.number().optional(),
  isActive: Joi.boolean().optional()
});