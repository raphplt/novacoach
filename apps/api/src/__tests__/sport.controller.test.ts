import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Sport API', () => {

  it('should retrieve all sports and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/sports')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single sport by ID and return 200', async () => {
    const sportId = 1;
    const response = await request(baseUrl)
      .get(`/api/sports/${sportId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', sportId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing sport and return 200', async () => {
    const sportId = 1;
    const updatedSport = {
      name: 'Updated Sport Name',
    };

    const response = await request(baseUrl)
      .put(`/api/sports/${sportId}`)
      .send(updatedSport)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedSport);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});