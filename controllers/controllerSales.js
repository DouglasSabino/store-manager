const { servicesSales } = require('../services/servicesSales');

const controllerSales = {
  postSaleProduct: async (req, res, _next) => {
    const sales = await servicesSales.postSaleProduct(req.body);
    return res.status(201).json(sales);
  },
  getSales: async (_req, res, _next) => {
    const sales = await servicesSales.getSales();
    return res.status(200).json(sales);
  },
  getSalesById: async (req, res, _next) => {
    const { id } = req.params;
    const sales = await servicesSales.getSalesById(Number(id));
    return res.status(200).json(sales);
  },
  deletePost: async (req, res, _next) => {
    const { id } = req.params;
    await servicesSales.deleteSale(Number(id));
    return res.status(204).end();
  },
  editSale: async (req, res) => { 
    const { id } = req.params;
    const edited = await servicesSales.editSale(id, req.body);
    return res.status(200).json(edited);
  },
};

module.exports = { controllerSales };