const { modelsProducts } = require('../models/modelsProducts');

const servicesProducts = {
  getAllProducts: async () => { 
    const products = await modelsProducts.getAllProducts();
    return products;
  },
  getProductById: async (id) => { 
    const product = await modelsProducts.getProductById(id);
    if (!product) throw Error('PRODUCT_NOT_FOUND');
    return product;
  },
  postProduct: async (name) => { 
    const product = await modelsProducts.postProduct(name);
    return product;
  },
  putProduct: async (id, name) => {
    await servicesProducts.getProductById(id);
    await modelsProducts.putProduct(id, name);
    const product = await servicesProducts.getProductById(id);
    return product;
  },
  deleteProduct: async (id) => {
    await servicesProducts.getProductById(id);
    await modelsProducts.deleteProduct(id);
  },
  getBySearch: async (search) => { 
    const product = await modelsProducts.getBySearch(search);
    return product;
  },
};

module.exports = { servicesProducts };
