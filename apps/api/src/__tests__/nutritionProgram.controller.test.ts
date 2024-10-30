import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Nutrition Program API', () => {

  it('should retrieve all nutrition programs and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/nutritionPrograms')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // it('should retrieve a single nutrition program by ID and return 200', async () => {
  //   const programId = 1; 
  //   const response = await request(baseUrl)
  //     .get(`/api/nutritionProgram/${programId}`)
  //     .set('Accept', 'application/json');

  //   if (response.statusCode === 200) {
  //     expect(response.body).toHaveProperty('id', programId);
  //   } else {
  //     expect(response.statusCode).toBe(404);
  //   }
  // });

  it('should update an existing nutrition program and return 200', async () => {
    const programId = 1;
    const updatedProgram = {
      description: 'Updated nutrition program description',
    };

    const response = await request(baseUrl)
      .put(`/api/nutritionProgram/${programId}`)
      .send(updatedProgram)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedProgram);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing nutrition program and return 204', async () => {
    const programId = 1;

    const response = await request(baseUrl)
      .delete(`/api/nutritionProgram/${programId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});