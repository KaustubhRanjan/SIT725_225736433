const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Books REST API Tests', () => {
  it('should return all books', async () => {
    const res = await request(app).get('/api/books');

    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an('array');
    expect(res.body.data.length).to.be.greaterThan(0);
  });

  it('should return one book by valid id', async () => {
    const res = await request(app).get('/api/books/b1');

    expect(res.status).to.equal(200);
    expect(res.body.data.id).to.equal('b1');
    expect(res.body.data.title).to.equal('The Three-Body Problem');
  });

  it('should return 404 for invalid book id', async () => {
    const res = await request(app).get('/api/books/wrongid');

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('Book not found');
  });
});