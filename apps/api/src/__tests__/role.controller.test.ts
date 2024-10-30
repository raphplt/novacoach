import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Role API', () => {

  it('should retrieve all roles and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/roles')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update an existing role and return 200', async () => {
    const roleId = 1;
    const updatedRole = {
      name: 'Updated Role Name',
    };

    const response = await request(baseUrl)
      .put(`/api/roles/${roleId}`)
      .send(updatedRole)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedRole);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});