const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require("sinon");

const { modelsSales } = require('../../../models/modelsSales');
const { servicesSales } = require('../../../services/servicesSales');

const mockSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

const mockSaleById = [{
  saleId: 1,
  date: "2021-09-09T04:54:54.000Z",
  productId: 2,
  quantity: 2
}];

const mockPostSale = [{
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
}];

describe('testa o servicesSales', () => { 
  beforeEach(() => { 
    sinon.restore();
  });
  describe('testa casos de sucesso', () => { 
    it('testa getSales', async () => { 
      sinon.stub(modelsSales, 'getSales').resolves(mockSales);
      chai.expect(await servicesSales.getSales()).to.be.equals(mockSales);
    });
    it('testa getSalesById', async () => {
      sinon.stub(modelsSales, 'getSalesById').resolves(mockSaleById);
      chai.expect(await servicesSales.getSalesById(1)).to.be.equals(mockSaleById);
    });
    it('testa postSaleProduct', async () => {
      sinon.stub(modelsSales, 'postSaleProduct').resolves(mockPostSale);
      chai.expect(await servicesSales.postSaleProduct([
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ])).to.be.equals(mockPostSale);
    });
  });  
});