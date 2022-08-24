const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require("sinon");

const { servicesProducts } = require('../../../services/servicesProducts');
const { modelsProducts } = require('../../../models/modelsProducts');

const mockProducts = [
  { id: 1, name: 'Marreta Bionica', quantity: 8 },
  { id: 2, name: 'Mascara do mascara', quantity: 2 },
  { id: 3, name: 'Action Figure', quantity: 17 },
];

const mockById = [{ id: 1, name: 'Marreta Bionica', quantity: 8 }];

const mockPost = [{ id: 1, name: 'example' }];

describe('testa o servicesProducts', () => { 
  beforeEach(() => { 
    sinon.restore();
  });
  describe('testa em caso de sucesso', () => { 
    it('testa getAllProducts', async () => { 
      sinon.stub(modelsProducts, 'getAllProducts').resolves(mockProducts);
      chai.expect(await servicesProducts.getAllProducts()).to.be.equals(mockProducts);
    });
    it('testa getProductById', async () => { 
      sinon.stub(modelsProducts, 'getProductById').resolves(mockById);
      chai.expect(await servicesProducts.getProductById(1)).to.be.equals(mockById);
    });
    it('testa postProduct', async () => {
      sinon.stub(modelsProducts, 'postProduct').resolves(mockPost);
      chai.expect(await servicesProducts.postProduct('example')).to.be.equals(mockPost);
    });
  });
});