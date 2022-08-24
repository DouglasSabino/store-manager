const express = require('express');
const { controllerSales } = require('../controllers/controllerSales');
const { saleSchema, schemaValidator } = require('../middlewares/validatorSales');

const salesRouters = express.Router();

// Rotas GET's
salesRouters.get('/:id', controllerSales.getSalesById);
salesRouters.get('/', controllerSales.getSales);

// Rotas POST'S
salesRouters.post('/', schemaValidator(saleSchema), controllerSales.postSaleProduct);

// Rotas DELETE
salesRouters.delete('/:id', controllerSales.deletePost);

// Rotas PUT
salesRouters.put('/:id', schemaValidator(saleSchema), controllerSales.editSale);

module.exports = { salesRouters };