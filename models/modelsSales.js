const { db } = require('./connection');

const modelsSales = {
  postSale: async () => { 
    const SQL_POST_SALE = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
    const [{ insertId }] = await db.query(SQL_POST_SALE);
    return insertId;
  },
  postSaleProduct: async (sales) => {
    const id = await modelsSales.postSale();
    const SQL_POST_SAL_PRODUCT = `INSERT INTO 
      StoreManager.sales_products(sale_id, product_id, quantity) VALUES ?`;
    const salesInserted = sales.map((s) => [id, s.productId, s.quantity]);
    await db.query(SQL_POST_SAL_PRODUCT, [salesInserted]);
    const postedSales = { id, itemsSold: sales };
    return postedSales;
  },
  getSales: async () => {
    const SQL_GET_SALES = `SELECT * FROM StoreManager.sales_products AS salesProducts
      INNER JOIN StoreManager.sales AS sales
      ON sales.id = salesProducts.sale_id
      ORDER BY sales.id, salesProducts.product_id;`;
    const [list] = await db.query(SQL_GET_SALES);
    const sales = list.map((s) => ({
      saleId: s.sale_id,
      date: s.date,
      productId: s.product_id,
      quantity: s.quantity,
    }));
    return sales;
  },
  getSalesById: async (id) => {
    const SQL_GET_SALES_BY_ID = `SELECT * FROM StoreManager.sales_products AS salesProducts
      INNER JOIN StoreManager.sales AS sales ON sales.id = salesProducts.sale_id
      WHERE salesProducts.sale_id = ?
      ORDER BY sales.id, salesProducts.product_id;`;
    const [list] = await db.query(SQL_GET_SALES_BY_ID, [id]);
    const sales = list.map((s) => ({
      date: s.date,
      productId: s.product_id,
      quantity: s.quantity,
    }));
    return sales;
  },
  deleteSale: async (id) => {
    const SQL_DELETE_SALE = 'DELETE FROM StoreManager.sales WHERE id = ?';
    await db.query(SQL_DELETE_SALE, [id]);
  },
  editSale: async (id, quantity, productId) => { 
    const SQL_EDIT_SALE = `UPDATE StoreManager.sales_products SET quantity = ? 
      WHERE sale_id = ? AND product_id = ?`;
    await db.query(SQL_EDIT_SALE, [quantity, id, productId]);
  },
};

module.exports = { modelsSales };
