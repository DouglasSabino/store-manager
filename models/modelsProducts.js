const { db } = require('./connection');

const modelsProducts = { 
  getAllProducts: async () => { 
    const SQL_GET_ALL = 'SELECT * FROM StoreManager.products';
    const [products] = await db.query(SQL_GET_ALL);
    return products;
  },
  getProductById: async (id) => { 
    const SQL_GET_BY_ID = 'SELECT * FROM StoreManager.products WHERE id=?';
    const [[product]] = await db.query(SQL_GET_BY_ID, [id]);
    return product;
  },
  postProduct: async (name) => { 
    const SQL_POST_PRODUCT = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(SQL_POST_PRODUCT, [name]);
    return { id: insertId, name };
  },
  putProduct: async (id, name) => { 
    const SQL_PUT_PRODUCT = 'UPDATE StoreManager.products SET name=? WHERE id=?';
    await db.query(SQL_PUT_PRODUCT, [name, id]);
  },
  deleteProduct: async (id) => {
    const SQL_DELETE_PRODUCT = 'DELETE FROM StoreManager.products WHERE id=?';
    await db.query(SQL_DELETE_PRODUCT, [id]);
  },
  getBySearch: async (search) => { 
    const SQL_SEARCH_PRODUCT = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const q = `%${search}%`;
    const [products] = await db.query(SQL_SEARCH_PRODUCT, [q]);
    return products;
  },
};

module.exports = { modelsProducts };
