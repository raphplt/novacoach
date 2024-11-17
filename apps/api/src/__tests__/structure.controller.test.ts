import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Structure API', () => {
  let structureId: number;

  it('should retrieve all structures and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/structures')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a structure by ID and return 200', async () => {
    structureId = 1;
    const response = await request(baseUrl)
      .get(`/api/structures/${structureId}`)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('id', structureId);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('should create a new structure and return 201', async () => {
    const newStructure = {
      name: 'Test Structure',
      description: 'This is a test structure',
      address: '123 Test Street',
      phone: '123-456-7890',
      logo: 'test-logo.png',
      coachId: 1
    };

    const response = await request(baseUrl)
      .post('/api/structures')
      .send(newStructure)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', newStructure.name);
    structureId = response.body.id;
  });

  it('should update an existing structure and return 200', async () => {
    const updatedData = {
      name: 'Updated Test Structure',
      description: 'Updated description',
      address: '456 New Street'
    };

    const response = await request(baseUrl)
      .put(`/api/structures/${structureId}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('name', updatedData.name);
      expect(response.body).toHaveProperty('description', updatedData.description);
      expect(response.body).toHaveProperty('address', updatedData.address);
    } else {
      expect(response.status).toBe(404);
    }
  });

});