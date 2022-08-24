const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require("sinon");

const { db } = require('../../../models/connection');
const { modelsProducts } = require('../../../models/modelsProducts');

const mockProducts = [
  { id: 1, name: 'Marreta Bionica', quantity: 8 },
  { id: 2, name: 'Mascara do mascara', quantity: 2 },
  { id: 3, name: 'Action Figure', quantity: 17 },
];

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

const mockNewProduct = { id: 1, name: "Homem-Aranha" };

describe('Testa o model de products e suas funções', () => {
  describe('A função getProductById', () => {
    beforeEach(() => {
      sinon.restore();
    })
    describe('testa caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(db, 'query').resolves([[mockProducts[0]], []]);
      });
      it('testa se é um objeto', async () => {
        const product = await modelsProducts.getProductById(1);
        chai.expect(product).to.be.an('object');
      });
      it('testa estrutura do objeto', async () => {
        const product = await modelsProducts.getProductById(1);
        chai.expect(product).to.be.deep.equal(mockProducts[0])
      });
    });
  });

  describe('A função postProduct', () => {
    beforeEach(() => {
      sinon.restore();
    })
    describe('testa caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      });
      it('testa se é um objeto', async () => {
        const product = await modelsProducts.postProduct('Homem-Aranha');
        chai.expect(product).to.be.an('object');
      });
      it('testa estrutura do objeto', async () => {
        const product = await modelsProducts.postProduct('Homem-Aranha');
        chai.expect(product).to.be.deep.equal(mockNewProduct)
      });
    });
  });
  describe('A função getAllProducts', async () => { 
    beforeEach(() => {
      sinon.restore();
    });
    describe('testa caso de sucesso', () => { 
      beforeEach(() => {
        sinon.stub(db, 'query').resolves(mockProducts);
      });
      it('testa se retorno é um objeto', async () => { 
        const products = await modelsProducts.getAllProducts();
        chai.expect(products).to.be.an('object');
      });
    });
  });
  describe('A função putProduct', async () => {
    beforeEach(() => {
      sinon.restore();
    });
    describe('testa caso de falha', () => {
      beforeEach(() => {
        sinon.stub(db, 'query').resolves(undefined);
      });
      it('testa se retorno é undefined', async () => {
        const products = await modelsProducts.putProduct();
        chai.expect(products).to.be.equals(undefined);
      });
    });
  });
  describe('A função deleteProduct', async () => {
    beforeEach(() => {
      sinon.restore();
    });
    describe('testa caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(db, 'query').resolves(undefined);
      });
      it('testa se retorno é undefined', async () => {
        const productDeleted = await modelsProducts.deleteProduct();
        chai.expect(productDeleted).to.be.equals(undefined);
      });
    });
  });
});