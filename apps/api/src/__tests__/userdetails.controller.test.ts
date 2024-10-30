import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('UserDetails API', () => {
  it('should retrieve all user details and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/userdetails')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve user details by user ID and return 200', async () => {
    const userId = 1;
    const response = await request(baseUrl)
      .get(`/api/userdetails/user/${userId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', userId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should create new user details and return 201', async () => {
    const newUserDetails = {
      heights: [{ value: 175 }],
      weights: [{ value: 70 }],
      bmis: [{ value: 22.9 }],
      muscleMasses: [{ value: 45 }],
      fatMasses: [{ value: 15 }],
    };

    const response = await request(baseUrl)
      .post('/api/userdetails')
      .send(newUserDetails)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('heights');
    expect(response.body).toHaveProperty('weights');
  });

  it('should update existing user details and return 200', async () => {
    const userDetailsId = 1;
    const updatedDetails = {
      heights: [{ value: 182 }],
      weights: [{ value: 77 }],
    };

    const response = await request(baseUrl)
      .put(`/api/userdetails/${userDetailsId}`)
      .send(updatedDetails)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('heights');
      expect(response.body.heights[0]).toHaveProperty('value', 182);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});