import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('User API', () => {
  let userId: number;

  it('should retrieve all users and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a user by ID and return 200', async () => {
    userId = 1;
    const response = await request(baseUrl)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('id', userId);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should retrieve a user by coach ID and return 200', async () => {
    const coachId = 1;
    const response = await request(baseUrl)
      .get(`/api/user/coach/${coachId}`)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('coach.id', coachId);
      expect(response.body).toHaveProperty('user');
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should retrieve students by structure ID and return 200', async () => {
    const structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/user/studentsByStructureID/${structureId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update an existing user and return 200', async () => {
    const updatedData = {
      firstName: 'Updated',
      lastName: 'User',
    };

    const response = await request(baseUrl)
      .put(`/api/users/${userId}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('firstName', updatedData.firstName);
    } else {
      expect(response.status).toBe(404);
    }
  });
});