const request = require('supertest');
const express = require('express');
const draftsRoute = require('./drafts');

const app = express();
app.use(express.json());
app.use('/api/drafts', draftsRoute);

// Mock the authenticateToken middleware
jest.mock('../authenticateToken', () => (req, res, next) => {
  req.user = { user_id: 1 }; // Mock user object
  next();
});

// Mock the database module
jest.mock('../db', () => ({
  query: jest.fn()
    .mockResolvedValueOnce({ rows: [{ draft_id: 1, user_id: 1, players_picked: [], draft_date: '2021-01-01' }] }) // For POST
    .mockResolvedValueOnce({ rows: [{ draft_id: 1, user_id: 1, players_picked: [], draft_date: '2021-01-01' }] }) // For GET specific
    .mockResolvedValueOnce({ rows: [{ draft_id: 1, user_id: 1, players_picked: [2], draft_date: '2021-01-01' }] }) // For PUT
    .mockResolvedValue({ rowCount: 1 }) // For DELETE
    .mockResolvedValue({ rows: [{ draft_id: 1, user_id: 1, players_picked: [], draft_date: '2021-01-01' }] }) // For GET all
}));

describe('Drafts Route', () => {
  test('POST /api/drafts should create a new draft', async () => {
    const response = await request(app).post('/api/drafts').send({
      draftDate: '2021-01-01'
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('draft_id');
  });

  test('GET /api/drafts/:id should return a specific draft', async () => {
    const response = await request(app).get('/api/drafts/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('draft_id', 1);
  });

  test('PUT /api/drafts/:id should update a specific draft', async () => {
    const response = await request(app).put('/api/drafts/1').send({ playersPicked: [2] });
    expect(response.statusCode).toBe(200);
    expect(response.body.players_picked).toContain(2);
  });

  test('DELETE /api/drafts/:id should delete a specific draft', async () => {
    const response = await request(app).delete('/api/drafts/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Draft deleted successfully');
  });

  test('GET /api/drafts should return all drafts', async () => {
    const response = await request(app).get('/api/drafts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ draft_id: expect.any(Number) })]));
  });
});
