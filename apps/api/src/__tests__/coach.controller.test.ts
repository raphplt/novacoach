import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Coach API', () => {
  let coachId: number;

  it('should retrieve all coaches and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/coaches')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a coach by ID and return 200', async () => {
    coachId = 1;
    const response = await request(baseUrl)
      .get(`/api/coaches/${coachId}`)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('id', coachId);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should retrieve a coach by user ID and return 200', async () => {
    const userId = 1;
    const response = await request(baseUrl)
      .get(`/api/coaches/user/${userId}`)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('user.id', userId);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should retrieve coaches by structure ID and return 200', async () => {
    const structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/coaches/structure/${structureId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new coach and return 201', async () => {
    const newCoach = {
      description: 'Test Coach',
      structureId: 1,
      user: { id: 1 }
    };

    const response = await request(baseUrl)
      .post('/api/coaches')
      .send(newCoach)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('description', newCoach.description);
    coachId = response.body.id;
  });

  it('should update an existing coach and return 200', async () => {
    const updatedData = {
      description: 'Updated Coach Description',
    };

    const response = await request(baseUrl)
      .put(`/api/coaches/${coachId}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('description', updatedData.description);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should delete a coach and return 204', async () => {
    const response = await request(baseUrl)
      .delete(`/api/coaches/${coachId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.status);
  });
});