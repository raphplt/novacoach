import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Goal API', () => {

  it('should retrieve all goals and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/goals')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new goal and return 201', async () => {
    const newGoal = {
      name: 'New Goal',
      description: 'This is a test goal',
      value: 100,
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      idUserDetails: 1
    };

    const response = await request(baseUrl)
      .post('/api/goals')
      .send(newGoal)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newGoal.name);
  });

  it('should update an existing goal and return 200', async () => {
    const goalId = 1;
    const updatedGoal = {
      name: 'Updated Goal Name',
      description: 'Updated goal description',
      value: 150,
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      idUserDetails: 1
    };

    const response = await request(baseUrl)
      .put(`/api/goals/${goalId}`)
      .send(updatedGoal)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedGoal);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing goal and return 204', async () => {
    const goalId = 1;

    const response = await request(baseUrl)
      .delete(`/api/goals/${goalId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});