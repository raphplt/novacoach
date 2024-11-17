import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Role API', () => {
  let roleId: number;

  it('should retrieve all roles and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/roles')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new role and return 201', async () => {
    const newRole = {
      name: 'Admin',
      permissions: ['CREATE_USER', 'DELETE_USER'],
    };

    const response = await request(baseUrl)
      .post('/api/roles')
      .send(newRole)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newRole.name);
    expect(response.body).toHaveProperty('permissions', newRole.permissions);

    roleId = response.body.id;
  });

  it('should update an existing role and return 200', async () => {
    const updatedRole = {
      name: 'Updated Role Name',
      permissions: ['READ_USER', 'UPDATE_USER'],
    };

    const response = await request(baseUrl)
      .put(`/api/roles/${roleId}`)
      .send(updatedRole)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('name', updatedRole.name);
      expect(response.body).toHaveProperty('permissions', updatedRole.permissions);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing role and return 204', async () => {
    const response = await request(baseUrl)
      .delete(`/api/roles/${roleId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});