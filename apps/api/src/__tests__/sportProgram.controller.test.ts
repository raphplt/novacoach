import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Sport Program API', () => {

  it('should retrieve all sport programs and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/sportPrograms')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single sport program by ID and return 200', async () => {
    const sportProgramId = 1;
    const response = await request(baseUrl)
      .get(`/api/sportProgram/${sportProgramId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', sportProgramId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should retrieve sport programs by structure ID and return 200', async () => {
    const structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/sportProgram/structure/${structureId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update an existing sport program and return 200', async () => {
    const sportProgramId = 1;
    const updatedSportProgram = {
      description: 'Updated strength training description',
    };

    const response = await request(baseUrl)
      .put(`/api/sportProgram/${sportProgramId}`)
      .send(updatedSportProgram)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedSportProgram);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing sport program and return 204', async () => {
    const sportProgramId = 1;

    const response = await request(baseUrl)
      .delete(`/api/sportProgram/${sportProgramId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});