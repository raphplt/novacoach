import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Structure API', () => {

  it('should retrieve all structures and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/structures')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single structure by ID and return 200', async () => {
    const structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/structures/${structureId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', structureId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing structure and return 200', async () => {
    const structureId = 1;
    const updatedStructure = {
      location: 'Updated Location',
    };

    const response = await request(baseUrl)
      .put(`/api/structures/${structureId}`)
      .send(updatedStructure)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedStructure);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});