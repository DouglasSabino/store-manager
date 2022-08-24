const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require("sinon");
const mysql = require('mysql2/promise');

const { db } = require('../../../models/connection');

describe('testa se o createPool devolve um objeto', () => {
  it('testa', async () => { 
    sinon.stub(mysql, 'createPool').resolves({});
    chai.expect(db).to.be.instanceOf(Object);
  });
});