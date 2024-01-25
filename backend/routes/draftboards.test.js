const request = require('supertest');
const express = require('express');
const draftboardsRoute = require('./draftboards'); 
const db = require('../db'); 
const authenticateToken = require('../authenticateToken');

const app = express();
app.use(express.json());
app.use(authenticateToken);
app.use('/api/draftboards', draftboardsRoute);

// Mock the authenticateToken middleware
jest.mock('../authenticateToken', () => (req, res, next) => {
  req.user = { user_id: 1 }; // Mocked user_id for testing
  next();
});

// Mock the db module
jest.mock('../db', () => ({
  query: jest.fn().mockImplementation((query, values) => {
    if (query.includes('INSERT INTO draftboards')) {
      return Promise.resolve({ rows: [{ draftboard_id: 1, user_id: values[0], players: values[1] }] });
    }
    if (query.includes('SELECT * FROM draftboards')) {
      return Promise.resolve({ rows: [{ draftboard_id: 1, user_id: 1, players: {} }] });
    }
    if (query.includes('UPDATE draftboards')) {
      return Promise.resolve({ rows: [{ draftboard_id: 1, user_id: 1, players: values[0] }] });
    }
    if (query.includes('DELETE FROM draftboards')) {
      return Promise.resolve({ rowCount: 1 });
    }
    return Promise.resolve({ rows: [], rowCount: 0 });
  })
}));

describe('Draftboard Routes', () => {
  test('POST /api/draftboards should create a new draftboard', async () => {
    const response = await request(app)
      .post('/api/draftboards')
      .set('Authorization', 'Bearer fake_token')
      .send();

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('draftboard_id');
    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
  });

  test('GET /api/draftboards/:userId should retrieve a draftboard', async () => {
    const response = await request(app)
      .get('/api/draftboards/1')
      .set('Authorization', 'Bearer fake_token')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('draftboard_id', 1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('PUT /api/draftboards/:userId should update a draftboard', async () => {
    const response = await request(app)
      .put('/api/draftboards/1')
      .set('Authorization', 'Bearer fake_token')
      .send({ players: { QB: [1, 2, 3] } });

    expect(response.statusCode).toBe(200);
    expect(response.body.players).toEqual({ QB: [1, 2, 3] });
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [expect.any(Object), 1]);
  });

  test('DELETE /api/draftboards/:userId should delete a draftboard', async () => {
    const response = await request(app)
      .delete('/api/draftboards/1')
      .set('Authorization', 'Bearer fake_token')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Draftboard deleted successfully' });
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });
});
