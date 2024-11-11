import request from 'supertest';
import app from '../index.js';

describe('CRUD API tests', () => {
  let itemId;

  // Test for creating an item
  it('should create an item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ id: '1', name: 'Test Item' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: '1', name: 'Test Item' });
    itemId = response.body.id; // Save id for other tests
  });

  // Test for reading an item
  it('should read an item', async () => {
    const response = await request(app).get(`/items/${itemId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Test Item' });
  });

  // Test for updating an item
  it('should update an item', async () => {
    const response = await request(app)
      .put(`/items/${itemId}`)
      .send({ name: 'Updated Item' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Item');
  });

  // Test for deleting an item
  it('should delete an item', async () => {
    const response = await request(app).delete(`/items/${itemId}`);

    expect(response.statusCode).toBe(204);
  });

  // Test for reading a non-existing item
  it('should return 404 for non-existing item', async () => {
    const response = await request(app).get(`/items/${itemId}`);
    expect(response.statusCode).toBe(404);
  });
});
