import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

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

  it('should create a new nutrition program meal and return 201', async () => {
    const newNutritionProgramMeal = {
      nutritionProgram: { id: 2 },
      meal: { id: 2 },
    };

    const response = await request(baseUrl)
      .post('/api/nutritionProgramsMeal')
      .send(newNutritionProgramMeal)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body.nutritionProgram).toHaveProperty('id', newNutritionProgramMeal.nutritionProgram.id);
    expect(response.body.meal).toHaveProperty('id', newNutritionProgramMeal.meal.id);
  });

  it('should update an existing nutrition program meal and return 200', async () => {
    const programMealId = 1;
    const updatedNutritionProgramMeal = {
      meal: { id: 3 },
    };

    const response = await request(baseUrl)
      .put(`/api/nutritionProgramsMeal/${programMealId}`)
      .send(updatedNutritionProgramMeal)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body.meal).toHaveProperty('id', updatedNutritionProgramMeal.meal.id);
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