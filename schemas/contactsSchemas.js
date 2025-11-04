import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  priority: Joi.boolean(),
  owner: Joi.string().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  priority: Joi.boolean(),
  owner: Joi.string().optional(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const updatePrioritySchema = Joi.object({
  priority: Joi.boolean().required(),
});
