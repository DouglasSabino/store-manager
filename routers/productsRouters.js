const express = require('express');
const { controllerProducts } = require('../controllers/controllerProducts');
const { schemaValidator, productSchema } = require('../middlewares/validatorProduct');

const productsRouters = express.Router();

// Rotas GET
productsRouters.get('/', controllerProducts.getAllProducts);
productsRouters.get('/search', controllerProducts.getBySearch);
productsRouters.get('/:id', controllerProducts.getProductById);

// Rotas POST 
productsRouters.post('/', schemaValidator(productSchema), controllerProducts.postProduct);

// Rotas PUT
productsRouters.put('/:id', schemaValidator(productSchema), controllerProducts.putProduct);

// Rotas DELETE
productsRouters.delete('/:id', controllerProducts.deleteProduct);

module.exports = { productsRouters };