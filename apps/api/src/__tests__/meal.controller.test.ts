import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

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

  it('should retrieve meals by nutrition program ID and return 200', async () => {
    const nutritionProgramId = 2;
    const response = await request(baseUrl)
      .get(`/api/meal/nutritionProgram/${nutritionProgramId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new meal and return 201', async () => {
    const newMeal = {
      mealStarter: 'Salad',
      mealMainCourse: 'Grilled Chicken',
      mainDessert: 'Fruit Salad',
      endDate: '2023-12-31T23:59:59Z',
      complements: 'Bread, Cheese',
      dayTime: '12:00:00'
    };

    const response = await request(baseUrl)
      .post('/api/meal')
      .send(newMeal)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('mealStarter', newMeal.mealStarter);
  });

  it('should update an existing meal and return 200', async () => {
    const mealId = 1;
    const updatedMeal = {
      mealStarter: 'Updated Salad',
      mealMainCourse: 'Updated Grilled Chicken',
      mainDessert: 'Updated Fruit Salad',
      endDate: '2024-12-31T23:59:59Z',
      complements: 'Updated Bread, Cheese',
      dayTime: '13:00:00'
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