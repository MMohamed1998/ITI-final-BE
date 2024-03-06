import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const token = Joi.object({
  token: Joi.string().required(),
}).required();

export const signup = Joi.object({
  firstName: generalFields.name,
  lastName: generalFields.name,
  email: generalFields.email,
  gender: Joi.string().valid("male", "female"),
  password: generalFields.password,
  cPassword: generalFields.cPassword.valid(Joi.ref("password")),
  phone:generalFields.phone,
  address:Joi.string(),
  city:Joi.string(),
  role: Joi.string().valid("User", "Designer"),
  skills:Joi.array()
  
}).required();

export const login = Joi.object({
  email: generalFields.email,
  password: generalFields.password,
}).required();



export const sendCode = Joi.object({
  email: generalFields.email,
  password: generalFields.password,
}).required();

export const forgetPassword = Joi.object({
  forgetCode: Joi.string()
    .pattern(new RegExp(/^[0-9]{6}$/))
    .required(),
  email: generalFields.email,
  password: generalFields.password,
  cPassword: generalFields.cPassword.valid(Joi.ref("password")),
}).required();
