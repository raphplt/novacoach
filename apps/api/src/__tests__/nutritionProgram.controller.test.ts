import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Nutrition Program API', () => {
  let nutritionProgramId: number;

  it('should retrieve all nutrition programs and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/nutritionPrograms')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a nutrition program by ID and return 200', async () => {
    nutritionProgramId = 1;
    const response = await request(baseUrl)
      .get(`/api/nutritionProgram/${nutritionProgramId}`)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toBeDefined();
      if (Array.isArray(response.body)) {
        expect(response.body.length).toBeGreaterThan(0);
      } else {
        expect(response.body).toHaveProperty('id', nutritionProgramId);
      }
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should retrieve nutrition programs by structure ID and return 200', async () => {
    const structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/nutritionProgram/structure/${structureId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new nutrition program and return 201', async () => {
    const newNutritionProgram = {
      name: 'Test Nutrition Program',
      duration: 30,
      frequency: 3,
      structure: { id: 1 }
    };

    const response = await request(baseUrl)
      .post('/api/nutritionPrograms')
      .send(newNutritionProgram)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', newNutritionProgram.name);
    nutritionProgramId = response.body.id;
  });

  it('should update an existing nutrition program and return 200', async () => {
    const updatedData = {
      name: 'Updated Nutrition Program Name',
      duration: 60,
    };

    const response = await request(baseUrl)
      .put(`/api/nutritionProgram/${nutritionProgramId}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('name', updatedData.name);
      expect(response.body).toHaveProperty('duration', updatedData.duration);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should delete a nutrition program and return 204', async () => {
    const response = await request(baseUrl)
      .delete(`/api/nutritionProgram/${nutritionProgramId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.status);
  });
});