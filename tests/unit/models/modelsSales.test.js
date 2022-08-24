const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { query } = require('express');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const { db } = require('../../../models/connection');
const { modelsSales } = require('../../../models/modelsSales');

const sucessResponse = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  }
]

const sucessResponseById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
]

describe('testa o modelsSales', () => { 
  beforeEach(() => { 
    sinon.restore();
  });
  describe('testa todas as funções caso de sucesso', () => {
    it('testa postSale', async () => { 
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      const insertId = await modelsSales.postSale();
      chai.expect(insertId).to.be.equals(1);
    });
    it('testa postSaleProduct', async () => { 
      sinon.stub(modelsSales, 'postSale').resolves(1);
      const expectValue = { id: 1, itemsSold: [{ quantity: 8, productId: 3 }] }
      const sale = await modelsSales.postSaleProduct([{ quantity: 8, productId: 3 }]);
      chai.expect(sale).to.be.deep.equal(expectValue);
    });
    it('testa se getSales retorna um array', async () => {
      sinon.stub(db, 'query').resolves([sucessResponse, []]);
      const list = await modelsSales.getSales();
      chai.expect(list).to.be.instanceOf(Array);
    });
    it('testa getSalesById', async () => { 
      sinon.stub(db, 'query').resolves([sucessResponseById, []]);
      const list = await modelsSales.getSalesById(1);
      chai.expect(list).to.be.instanceOf(Array);
    });
  });  
});