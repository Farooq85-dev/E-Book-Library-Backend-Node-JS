import Joi from "joi";

// User Schema
const userSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,10}$/), // At least 1 uppercase, 1 lowercase, and 1 digit
  refreshToken: Joi.string().optional(), // Explicitly optional
});

// Books Schema
const booksSchemaValidation = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  publishDate: Joi.string()
    .required()
    .pattern(/^\d{4}$/), // Year format
  bookImage: Joi.object().required(),
});

export { userSchemaValidation, booksSchemaValidation };
