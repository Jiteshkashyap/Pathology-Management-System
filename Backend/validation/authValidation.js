import Joi from "joi";


export const registerValidation= Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().optional(),
    phone:Joi.string().pattern(/^[0-9]{10}$/).optional(),
    age:Joi.number().optional()
})
export const loginValidation=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})