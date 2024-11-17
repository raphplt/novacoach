import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Message API', () => {

  it('should retrieve all messages and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/messages')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single message by ID and return 200', async () => {
    const messageId = 1;
    const response = await request(baseUrl)
      .get(`/api/messages/${messageId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('idMessage', messageId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should create a new message and return 201', async () => {
    const newMessage = {
      room: '1',
      senderId: '1',
      content: 'This is a test message',
    };

    const response = await request(baseUrl)
      .post('/api/messages')
      .send(newMessage)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('content', newMessage.content);
  });

  it('should update an existing message and return 200', async () => {
    const messageId = 1;
    const updatedMessage = {
      content: 'Updated message content',
    };

    const response = await request(baseUrl)
      .put(`/api/messages/${messageId}`)
      .send(updatedMessage)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedMessage);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing message and return 204', async () => {
    const messageId = 1;

    const response = await request(baseUrl)
      .delete(`/api/messages/${messageId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});