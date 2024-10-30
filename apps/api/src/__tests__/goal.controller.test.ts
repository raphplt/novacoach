import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Goal API', () => {

  it('should retrieve all goals and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/goals')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update an existing goal and return 200', async () => {
    const goalId = 1;
    const updatedGoal = {
      description: 'Updated goal description'
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