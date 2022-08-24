const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require("sinon");

const { controllerSales } = require("../../../controllers/controllerSales");
const { servicesSales } = require('../../../services/servicesSales');

const mockCreateSales = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      quantity: 5,
      productId: 2
    }
  ]
}

describe('testa o controllerSales', () => {
  beforeEach(() => {
    sinon.restore();
  })
  const req = {};
  const res = {};
  describe('O retorno do método postSaleProduct', () => {
    beforeEach(() => {
      req.body = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(servicesSales, 'postSaleProduct').resolves(mockCreateSales)
    })
    describe('testa caso de sucesso', () => {
      it('O retorno é um array', async () => {
        await controllerSales.postSaleProduct(req, res);
        chai.expect(res.status.calledWith(201)).to.be.true;
        chai.expect(res.json.calledWith(mockCreateSales)).to.be.true
      })
    })
  })
  describe('O retorno do método getSales', () => {
    beforeEach(() => {
      req.body = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(servicesSales, 'getSales').resolves(mockCreateSales)
    })
    describe('testa caso de sucesso', () => {
      it('O retorno é um array', async () => {
        await controllerSales.getSales(req, res);
        chai.expect(res.status.calledWith(200)).to.be.true;
        chai.expect(res.json.calledWith(mockCreateSales)).to.be.true
      })
    })
  })
})