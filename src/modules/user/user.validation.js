import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";




export const addUser = Joi.object({
  firstName: generalFields.name,
  lastName: generalFields.name,
  email: generalFields.email,
  gender: Joi.string().valid("male", "female"),
  password: generalFields.password,
  cPassword: generalFields.cPassword.valid(Joi.ref("password")),
  phone:generalFields.phone,
  address:Joi.string(),
  city:Joi.string(),
  role: Joi.string().valid("User", "Designer","Admin"),
  skills:Joi.array()
}).required();

export const updateUser = Joi.object({
  _id: generalFields.id,
  firstName: generalFields.name,
  lastName: generalFields.name,
  password: generalFields.password,
  role: Joi.string().valid("User", "Admin", "Designer"),
  gender: Joi.string().valid("male", "female"),
  skills:Joi.array()
}).required();

export const changePassword = Joi.object({
  oldPassword: generalFields.password,
  newPassword: generalFields.password,
  cPassword: generalFields.cPassword.valid(Joi.ref("newPassword")),
}).required();

export const deleteUser = Joi.object({
  userId: generalFields.id,
}).required();

export const addUserImage = Joi.object({
  profileImage: generalFields.file,
  image: generalFields.file,
}).required();
