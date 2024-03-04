import Joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addOffer = Joi.object({
    project:generalFields.id,
    description: Joi.string().required(),
    price:Joi.number().min(25).max(10000).required(), 
    time:Joi.number().min(1).max(90).required(),
}).required();

export const updateOffer=Joi.object({
    description: Joi.string(),
    price:Joi.number().min(25).max(10000), 
    time:Joi.number().min(1).max(90),
    offerId:generalFields.id
}).required();

export const deleteOffer=Joi.object({
    offerId:generalFields.id
}).required();

export const oneOffer=Joi.object({
    offerId:generalFields.id
}).required();
 