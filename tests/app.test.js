const app = require('../src/app');
const supertest = require('supertest');
const request = supertest(app);

describe('GET /api/v1/', () => {
  it('should return a response', async () => {
    const response = await request.get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Welcome to API ALBUM.');
  });
});

// describe('GET /album', () => {
//   it('responds with json', function (done) {
//     request
//       .get('/api/v1/album')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   });
// });
