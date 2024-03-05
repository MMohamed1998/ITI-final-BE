import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addProject = Joi.object({
    title: Joi.string().min(25).required(),
    description: Joi.string().required(),
    expectedPrice: Joi.string().valid("25 - 50$","50 - 100$","100 - 250$","250 - 500$","500 - 1000$","1000 - 2500$","2500 -5000$","5000 - 10000$").required(),
    expectedTime: Joi.number().min(1).max(90).required(), 
    category:generalFields.id,
  
}).required();

export const updateProject=Joi.object({
    title: Joi.string().min(25),
    description: Joi.string(),
    expectedPrice: Joi.string().valid("25 - 50$","50 - 100$","100 - 250$","250 - 500$","500 - 1000$","1000 - 2500$","2500 -5000$","5000 - 10000$"),
    expectedTime: Joi.number().min(1).max(90), 
    category:generalFields.optionalId,
    projectId:generalFields.id
}).required();

export const deleteProject=Joi.object({
    projectId:generalFields.id
}).required();