const request = require('supertest');
const app = require('./server');

describe('API Status Endpoint', () => {
  it('should return operational status', async () => {
    const res = await request(app)
      .get('/api/v1/status')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.status).toBe('operational');
  });
});
