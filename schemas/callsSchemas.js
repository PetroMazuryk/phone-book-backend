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

export const editCallSchema = Joi.object({
  date: Joi.string().isoDate().messages({
    "string.isoDate": "Date must be in ISO format",
  }),
  direction: Joi.string().valid("in", "out").messages({
    "any.only": "Direction must be 'in' or 'out'",
  }),
  time: Joi.string().messages({
    "string.base": "Time must be a string",
  }),
  duration: Joi.string().messages({
    "string.base": "Duration must be a string",
  }),
  description: Joi.string().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
