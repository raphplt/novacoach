import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Coach API', () => {

  it('should retrieve all coaches and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/coaches')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single coach by ID and return 200', async () => {
    const coachId = 1;
    const response = await request(baseUrl)
      .get(`/api/coaches/${coachId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', coachId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should retrieve coaches by structure ID and return 200', async () => {
    const structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/coaches/structure/${structureId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a coach by user ID and return 200', async () => {
    const userId = 1;
    const response = await request(baseUrl)
      .get(`/api/coaches/user/${userId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('user.id', userId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing coach and return 200', async () => {
    const coachId = 1; 
    const updatedCoach = {
      description: 'Updated coach description'
    };

    const response = await request(baseUrl)
      .put(`/api/coaches/${coachId}`)
      .send(updatedCoach)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedCoach);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});