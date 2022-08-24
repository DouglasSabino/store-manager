const Joi = require('joi');

const handleJoiError = (errMessage) => {
  const [code, message] = errMessage.split('|');
  return { code: Number(code), message };
};

const handleError = (err, _req, res, _next) => {
  if (Joi.isError(err)) {
    const { code, message } = handleJoiError(err.message);
    return res.status(code).json({ message });
  }

  const errors = {
    PRODUCT_NOT_FOUND: { code: 404, message: 'Product not found' },
    SALE_NOT_FOUND: { code: 404, message: 'Sale not found' },
  };
  
  const error = errors[err.message];
  if (error) return res.status(error.code).json({ message: error.message });
  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = { handleError };