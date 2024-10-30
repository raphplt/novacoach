import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Conversation API', () => {

  it('should create a new conversation and return 201', async () => {
    const participants = [{ id: 1 }, { id: 2 }];
    const response = await request(baseUrl)
      .post('/api/conversations')
      .send({ participants })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('participants');
  });

  it('should retrieve a conversation by ID and return 200', async () => {
    const conversationId = 1;
    const response = await request(baseUrl)
      .get(`/api/conversations/${conversationId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', conversationId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should retrieve all conversations and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/conversations')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  interface User {
    id: number;
  }
  
  it('should get or create a conversation between two users and return 200', async () => {
    const user1Id = 1;
    const user2Id = 2;
    const response = await request(baseUrl)
      .post('/api/conversations/getOrCreate')
      .send({ user1Id, user2Id })
      .set('Accept', 'application/json');
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('participants');
    expect(response.body.participants.some((user: User) => user.id === user1Id)).toBe(true);
    expect(response.body.participants.some((user: User) => user.id === user2Id)).toBe(true);
  });
});