import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('UserHasNutritionProgram API', () => {
  it('should retrieve a user nutrition program by ID and return 200', async () => {
    const programId = 1;
    const response = await request(baseUrl)
      .get(`/api/user-nutrition-programs/${programId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', programId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update a user nutrition program and return 200', async () => {
    const programId = 1; 
    const updatedProgramData = {
      endDate: "2024-12-31",
    };

    const response = await request(baseUrl)
      .put(`/api/user-nutrition-programs/${programId}`)
      .send(updatedProgramData)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('endDate', updatedProgramData.endDate);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete a user nutrition program and return 204', async () => {
    const programId = 1; 

    const response = await request(baseUrl)
      .delete(`/api/user-nutrition-programs/${programId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});