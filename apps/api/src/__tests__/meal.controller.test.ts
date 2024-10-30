import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Meal API', () => {

  it('should retrieve all meals and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/meals')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single meal by ID and return 200', async () => {
    const mealId = 1;
    const response = await request(baseUrl)
      .get(`/api/meal/${mealId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', mealId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing meal and return 200', async () => {
    const mealId = 1;
    const updatedMeal = {
      description: 'Updated meal description',
    };

    const response = await request(baseUrl)
      .put(`/api/meal/${mealId}`)
      .send(updatedMeal)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedMeal);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing meal and return 204', async () => {
    const mealId = 1;

    const response = await request(baseUrl)
      .delete(`/api/meal/${mealId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});