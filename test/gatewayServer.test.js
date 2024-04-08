const request = require('supertest');
const { app, server } = require('../server');

describe('API Gateway Tests', () => {

  afterAll((done) => {
    server.close(done);
  });

  it('should have a proxy setup for /user', async () => {
    const res = await request(app).get('/user/test');
    
    expect(res.statusCode).not.toEqual(502); 
  });

  it('should have a proxy setup for /product', async () => {
    const res = await request(app).get('/product/test');
    
    expect(res.statusCode).not.toEqual(502);
  });

});
