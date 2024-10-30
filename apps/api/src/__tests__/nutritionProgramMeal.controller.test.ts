import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Nutrition Program Meal API', () => {

  it('should retrieve all nutrition program meals and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/nutritionProgramsMeal')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single nutrition program meal by ID and return 200', async () => {
    const programMealId = 1;
    const response = await request(baseUrl)
      .get(`/api/nutritionProgramsMeal/${programMealId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', programMealId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing nutrition program meal and return 200', async () => {
    const programMealId = 1;
    const updatedNutritionProgramMeal = {
      mealId: 2,
    };

    const response = await request(baseUrl)
      .put(`/api/nutritionProgramsMeal/${programMealId}`)
      .send(updatedNutritionProgramMeal)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedNutritionProgramMeal);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing nutrition program meal and return 204', async () => {
    const programMealId = 1;

    const response = await request(baseUrl)
      .delete(`/api/nutritionProgramsMeal/${programMealId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});