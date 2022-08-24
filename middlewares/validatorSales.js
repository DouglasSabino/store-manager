const Joi = require('joi');

const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().positive()
    .required()
    .messages({
      'number.base': '422|"productId" must be a number',
      'number.integer': '422|"productId" must be an integer',
      'number.positive': '422|"productId" must be greater than or equal to 1',
      'any.required': '400|"productId" is required',
    }),
  quantity: Joi.number().integer()
    .required().greater(0)
    .messages({
      'number.base': '422|"quantity" must be a number',
      'number.integer': '422|"quantity" must be an integer',
      'number.positive': '422|"quantity" must be greater than or equal to 1',
      'number.greater': '422|"quantity" must be greater than or equal to 1',
      'any.required': '400|"quantity" is required',
    }),
}));

const schemaValidator = (schema) => async (req, _res, next) => {
  await schema.validateAsync(req.body);
  next();
};

module.exports = { saleSchema, schemaValidator };