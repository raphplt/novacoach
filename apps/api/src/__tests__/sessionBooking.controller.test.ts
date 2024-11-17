import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Session Booking API', () => {
  let sessionBookingId: number;

  it('should retrieve all session bookings and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/sessionBookings')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single session booking by ID and return 200', async () => {
    sessionBookingId = 1;
    const response = await request(baseUrl)
      .get(`/api/sessionBookings/${sessionBookingId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', sessionBookingId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should create a new session booking and return 201', async () => {
    const newSessionBooking = {
      dateStart: new Date().toISOString(),
      dateEnd: new Date(new Date().getTime() + 3600000).toISOString(),
      user: 1,
      coach: 1,
    };

    const response = await request(baseUrl)
      .post('/api/sessionBookings')
      .send(newSessionBooking)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('dateStart', newSessionBooking.dateStart);
    expect(response.body).toHaveProperty('dateEnd', newSessionBooking.dateEnd);
    expect(response.body).toHaveProperty('user', newSessionBooking.user);
    expect(response.body).toHaveProperty('coach', newSessionBooking.coach);

    sessionBookingId = response.body.id;
  });

  it('should update an existing session booking and return 200', async () => {
    const updatedSessionBooking = {
      dateEnd: new Date(new Date().getTime() + 7200000).toISOString(),
    };

    const response = await request(baseUrl)
      .put(`/api/sessionBookings/${sessionBookingId}`)
      .send(updatedSessionBooking)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('dateEnd', updatedSessionBooking.dateEnd);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing session booking and return 204', async () => {
    const response = await request(baseUrl)
      .delete(`/api/sessionBookings/${sessionBookingId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});