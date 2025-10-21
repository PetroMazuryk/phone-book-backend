import Joi from "joi";

export const createCallSchema = Joi.object({
  date: Joi.string().isoDate().required().messages({
    "any.required": "Date is required",
    "string.isoDate": "Date must be in ISO format",
  }),
  direction: Joi.string().valid("in", "out").required().messages({
    "any.required": "Direction is required",
    "any.only": "Direction must be 'in' or 'out'",
  }),
  time: Joi.string().required().messages({
    "any.required": "Time is required",
  }),
  duration: Joi.string().required().messages({
    "any.required": "Duration is required",
  }),
  description: Joi.string().optional(),
});
