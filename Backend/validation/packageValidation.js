import Joi from "joi";


export const createPackageSchema = Joi.object({
  name: Joi.string().required(),
  tests: Joi.array().items(Joi.string().required()) .min(1).required(),
  discountPercentage: Joi.number().min(0).max(100).optional()
});

export const updatePackageSchema = Joi.object({
  name: Joi.string().optional(),
  tests: Joi.array().items(Joi.string()).optional(),
  discountPercentage: Joi.number().min(0).max(100).optional(),
  isActive: Joi.boolean().optional()
});