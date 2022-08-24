const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require("sinon");

const { controllerProducts } = require("../../../controllers/controllerProducts");
const { servicesProducts } = require('../../../services/servicesProducts');

const res = {};
const req = {};

const mockProducts = [
  { id: 1, name: 'Marreta Bionica', quantity: 8 },
  { id: 2, name: 'Mascara do mascara', quantity: 2 },
  { id: 3, name: 'Action Figure', quantity: 17 },
];

const mockNewProduct = { id: 1, name: "Homem-Aranha" };

describe('testa o controllerProducts', () => {
  describe('testa o getAllProducts', () => {
    beforeEach(() => {
      sinon.restore();
    })
    const res = {}
    const req = {}

    describe('testa caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();
        sinon.stub(servicesProducts, 'getAllProducts').resolves(mockProducts);
      });

      it('A api retorna status 200 com um array de produtos preenchido', async () => {
        await controllerProducts.getAllProducts(req, res);
        chai.expect(res.status.calledWith(200)).to.be.true;
        chai.expect(res.json.calledWith(mockProducts)).to.be.true
      });
    });
  });

  describe('O retorno do método getProductById', () => {
    const req = {}
    const res = {}
    beforeEach(() => {
      sinon.restore();
    })
    describe('testa caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();
        req.params = sinon.stub().returns();
        sinon.stub(servicesProducts, 'getProductById').resolves(mockProducts[0]);
      });

      it('A api retorna status 200 com um array de produtos preenchido', async () => {
        await controllerProducts.getProductById(req, res);
        chai.expect(res.status.calledWith(200)).to.be.true;
        chai.expect(res.json.calledWith(mockProducts[0])).to.be.true
      });
    });
  });
  describe('O retorno do método postProduct', () => {
    const req = {}
    const res = {}
    beforeEach(() => {
      sinon.restore();
    })
    describe('testa caso de sucesso', () => {
      beforeEach(() => {
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns();
        req.body = sinon.stub().returns({})
        sinon.stub(servicesProducts, 'postProduct').resolves(mockNewProduct);
      });

      it('testa se a api retorna o codigo 201 e o novo produto cadastrado', async () => {
        await controllerProducts.postProduct(req, res);
        chai.expect(res.status.calledWith(201)).to.be.true;
        chai.expect(res.json.calledWith(mockNewProduct)).to.be.true
      });
    });
  });
});