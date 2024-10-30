import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Invitation API', () => {

  it('should retrieve invitations by coach ID and return 200', async () => {
    const coachId = 1;

    const response = await request(baseUrl)
      .get(`/api/invitations/coach/${coachId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.invitations)).toBe(true);
  });

  it('should retrieve invitations by user ID and return 200', async () => {
    const userId = 1;

    const response = await request(baseUrl)
      .get(`/api/invitations/user/${userId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.invitations)).toBe(true);
  });
});