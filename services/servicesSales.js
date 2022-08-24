const { modelsSales } = require('../models/modelsSales');
const { servicesProducts } = require('./servicesProducts');

const servicesSales = {
  checkIfExist: async (products) => {
    const Exists = products.map((p) => servicesProducts.getProductById(p.productId));
    await Promise.all(Exists);
  },
  postSaleProduct: async (sales) => {
    await servicesSales.checkIfExist(sales);
    const postedSales = await modelsSales.postSaleProduct(sales);
    return postedSales;
  },
  getSales: async () => {
    const sales = await modelsSales.getSales();
    if (!sales.length) throw Error('SALE_NOT_FOUND');
    return sales;
  },
  getSalesById: async (id) => {
    const sales = await modelsSales.getSalesById(id);
    if (!sales.length) throw Error('SALE_NOT_FOUND');
    return sales;
  },
  deleteSale: async (id) => {
    await servicesSales.getSalesById(id);
    await modelsSales.deleteSale(id);
  },
  editSale: async (id, newObj) => { 
    await servicesSales.getSalesById(id);
    await servicesSales.checkIfExist(newObj);
    const promises = newObj.map((i) => modelsSales.editSale(id, i.quantity, i.productId));
    await Promise.all(promises);
    return { saleId: id, itemsUpdated: newObj };
  },
};

module.exports = { servicesSales };
