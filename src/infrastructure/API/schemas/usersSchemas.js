import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(2).max(30).allow(""),
  lastname: Joi.string().min(2).max(30),
  category: Joi.string().valid("trabajador", "administrador").lowercase(),
  address: Joi.string().max(100).allow(""),
  gender: Joi.string().valid("male", "female", "other").lowercase(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(50).required().messages(),
});

export const getUserSchema = Joi.object({
  id: Joi.string().required(),
});
