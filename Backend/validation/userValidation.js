import Joi from "joi";

export const updateRoleSchema = Joi.object({
  role: Joi.string()
    .valid("admin", "technician", "patient")
    .required(),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  age:Joi.number().optional()
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});