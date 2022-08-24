const { servicesProducts } = require('../services/servicesProducts');

const controllerProducts = {
  getAllProducts: async (_req, res) => {
    const products = await servicesProducts.getAllProducts();
    return res.status(200).json(products);
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await servicesProducts.getProductById(Number(id));
    return res.status(200).json(product);
  },
  postProduct: async (req, res) => {
    const { name } = req.body;
    const product = await servicesProducts.postProduct(name);
    return res.status(201).json(product);
  },
  putProduct: async (req, res) => { 
    const { id } = req.params;
    const { name } = req.body;
    const prodEdited = await servicesProducts.putProduct(Number(id), name);
    return res.status(200).json(prodEdited);
  },
  deleteProduct: async (req, res) => { 
    const { id } = req.params;
    await servicesProducts.deleteProduct(Number(id));
    return res.status(204).end();
  },
  getBySearch: async (req, res) => { 
    const { q } = req.query;
    const products = await servicesProducts.getBySearch(q);
    return res.status(200).json(products);
  },
};

module.exports = { controllerProducts };