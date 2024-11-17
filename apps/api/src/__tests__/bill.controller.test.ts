import request from 'supertest';

const baseUrl = process.env.BASE_URL!;

describe('Bill API', () => {
  it('should retrieve all bills and return 200', async () => {
    const response = await request(baseUrl)
      .get('/api/bills')
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single bill by ID and return 200', async () => {
    const billId = 1;
    const response = await request(baseUrl)
      .get(`/api/bills/${billId}`)
      .set('Accept', 'application/json');

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('idBill', billId);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should create a new bill and return 201', async () => {
    const newBill = {
      amount: 1000,
      dateIssued: "2023-11-07",
      dateDue: "2023-12-31",
      status: "unpaid",
      userDetails: {
        id: 2
      }
    };

    const response = await request(baseUrl)
      .post('/api/bills')
      .send(newBill)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('amount', newBill.amount);
  });

  it('should update an existing bill and return 200', async () => {
    const billId = 1;
    const updatedData = {
      amount: 1500,
      dateIssued: '2023-11-07',
      dateDue: '2023-12-31',
      status: 'paid',
      userDetails: { id: 2 }
    };
  
    const response = await request(baseUrl)
      .put(`/api/bills/${billId}`)
      .send(updatedData)
      .set('Accept', 'application/json');
  
    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('amount', updatedData.amount);
    } else {
      expect(response.statusCode).toBe(404);
    }
  });

  it('should delete a bill and return 204', async () => {
    const billId = 1;

    const response = await request(baseUrl)
      .delete(`/api/bills/${billId}`)
      .set('Accept', 'application/json');

    expect([204, 404]).toContain(response.statusCode);
  });
});