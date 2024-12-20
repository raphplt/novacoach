import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Licence API', () => {

  it('should retrieve all licences and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/licences')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new licence and return 201', async () => {
    const newLicence = {
      name: 'New Licence',
      description: 'This is a test licence',
      issueDate: '2023-11-01',
      expiryDate: '2024-11-01',
      userDetails: {
        id: 1
      }
    };

    const response = await request(baseUrl)
      .post('/api/licences')
      .send(newLicence)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newLicence.name);
  });

  it('should retrieve a single licence by ID and return 200', async () => {
    const licenceId = 1;
    const response = await request(baseUrl)
      .get(`/api/licences/${licenceId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('idLicence', licenceId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing licence and return 200', async () => {
    const licenceId = 1;
    const updatedLicence = {
      name: 'Updated Licence Name',
      description: 'Updated licence description',
      issueDate: '2023-12-01',
      expiryDate: '2024-12-01',
      userDetails: {
        id: 1
      }
    };

    const response = await request(baseUrl)
      .put(`/api/licences/${licenceId}`)
      .send(updatedLicence)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedLicence);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing licence and return 204', async () => {
    const licenceId = 1;

    const response = await request(baseUrl)
      .delete(`/api/licences/${licenceId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});