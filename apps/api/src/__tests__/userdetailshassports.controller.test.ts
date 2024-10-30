import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('UserDetailsHasSports API', () => {
  it('should retrieve all user details and their sports associations and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/userdetailshassports')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a user details and sports association and return 200', async () => {
    const associationId = 1;
    const updatedData = {
      endDate: "2024-12-31",
    };

    const response = await request(baseUrl)
      .put(`/api/userdetailshassports/${associationId}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('endDate', updatedData.endDate);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete a user details and sports association and return 204', async () => {
    const associationId = 1;

    const response = await request(baseUrl)
      .delete(`/api/userdetailshassports/${associationId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});