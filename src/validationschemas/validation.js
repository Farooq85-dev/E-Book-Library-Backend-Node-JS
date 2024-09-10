import Joi from "joi";

//User Schema
const userSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
  password: Joi.string()
    .required()
    .pattern(/^.{8,10}$/),
  refreshToken: Joi.string(),
});

//Books Schema
const booksSchemaValidation = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  publishDate: Joi.string()
    .required()
    .pattern(/^\d{4}$/),
  bookImage: Joi.object().required(),
});

export { userSchemaValidation, booksSchemaValidation };
