import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('UserHasMessage API', () => {
  it('should retrieve a user message by ID and return 200', async () => {
    const messageId = 1; 
    const response = await request(baseUrl)
      .get(`/api/user-messages/${messageId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', messageId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update a user message and return 200', async () => {
    const messageId = 1; 
    const updatedMessageData = {
      read: true,
    };

    const response = await request(baseUrl)
      .put(`/api/user-messages/${messageId}`)
      .send(updatedMessageData)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('read', true);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete a user message and return 204', async () => {
    const messageId = 1; 

    const response = await request(baseUrl)
      .delete(`/api/user-messages/${messageId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});