const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '422|"name" length must be at least 5 characters long',
    'string.base': '422|"name" must be a string',
    'string.empty': '400|"name" is required',
    'any.required': '400|"name" is required',
  }),
});

const schemaValidator = (schema) => async (req, _res, next) => {
  await schema.validateAsync(req.body);
  next();
};

module.exports = { schemaValidator, productSchema };
