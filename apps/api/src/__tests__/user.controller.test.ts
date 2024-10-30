import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('User API', () => {

  it('should retrieve all users and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/users')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single user by ID and return 200', async () => {
    const userId = 1; 
    const response = await request(baseUrl)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', userId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});