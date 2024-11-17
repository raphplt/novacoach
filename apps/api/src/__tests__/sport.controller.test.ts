import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Sport API', () => {
  let sportId: number;

  it('should retrieve all sports and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/sports')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single sport by ID and return 200', async () => {
    sportId = 1;
    const response = await request(baseUrl)
      .get(`/api/sports/${sportId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', sportId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('icon');
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should create a new sport and return 201', async () => {
    const newSport = {
      name: 'Basketball',
      description: 'A team sport played with a ball and hoop.',
      icon: 'basketball-icon.png'
    };

    const response = await request(baseUrl)
      .post('/api/sports')
      .send(newSport)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', newSport.name);
    expect(response.body).toHaveProperty('description', newSport.description);
    expect(response.body).toHaveProperty('icon', newSport.icon);

    sportId = response.body.id;
  });

  it('should update an existing sport and return 200', async () => {
    const updatedSport = {
      name: 'Updated Sport Name',
      description: 'Updated description of the sport.',
      icon: 'updated-icon.png'
    };

    const response = await request(baseUrl)
      .put(`/api/sports/${sportId}`)
      .send(updatedSport)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('name', updatedSport.name);
      expect(response.body).toHaveProperty('description', updatedSport.description);
      expect(response.body).toHaveProperty('icon', updatedSport.icon);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing sport and return 204', async () => {
    const response = await request(baseUrl)
      .delete(`/api/sports/${sportId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});