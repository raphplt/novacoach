import request from 'supertest';

const baseUrl = 'http://localhost:3002';

describe('Session Booking API', () => {

  it('should retrieve all session bookings and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/sessionBookings')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single session booking by ID and return 200', async () => {
    const sessionBookingId = 1; // Remplace par un ID valide de session booking
    const response = await request(baseUrl)
      .get(`/api/sessionBookings/${sessionBookingId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('id', sessionBookingId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should update an existing session booking and return 200', async () => {
    const sessionBookingId = 1; 
    const updatedSessionBooking = {
      userId: 2,
    };

    const response = await request(baseUrl)
      .put(`/api/sessionBookings/${sessionBookingId}`)
      .send(updatedSessionBooking)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toMatchObject(updatedSessionBooking);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete an existing session booking and return 204', async () => {
    const sessionBookingId = 1;

    const response = await request(baseUrl)
      .delete(`/api/sessionBookings/${sessionBookingId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});