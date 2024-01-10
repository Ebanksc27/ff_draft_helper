const request = require('supertest');
const express = require('express');
const rankingsRoute = require('./rankings'); 

const app = express();
app.use(express.json());
app.use('/api/rankings', rankingsRoute);

// Mock the authenticateToken middleware
jest.mock('../authenticateToken', () => (req, res, next) => next());

// Mock the database module
jest.mock('../db', () => ({
  query: jest.fn()
    .mockResolvedValueOnce({ rows: [{ player_id: 1, rank: 1, ranking_criteria: 'Test Criteria' }] }) // For GET all
    .mockResolvedValueOnce({ rows: [{ player_id: 1, rank: 1, ranking_criteria: 'Test Criteria' }] }) // For GET specific
    .mockResolvedValueOnce({ rows: [{ player_id: 1, rank: 2, ranking_criteria: 'Updated Criteria' }] }) // For PUT
    .mockResolvedValue({ rowCount: 1 }) // For DELETE
}));

describe('Rankings Route', () => {
  test('GET /api/rankings should return all rankings', async () => {
    const response = await request(app).get('/api/rankings');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          player_id: expect.any(Number),
          rank: expect.any(Number),
          ranking_criteria: expect.any(String)
        })
      ])
    );
  });

  test('GET /api/rankings/:playerId should return a specific player\'s ranking', async () => {
    const response = await request(app).get('/api/rankings/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('player_id', 1);
  });

  test('PUT /api/rankings/:playerId should update a specific player\'s ranking', async () => {
    const response = await request(app).put('/api/rankings/1').send({ rank: 2, ranking_criteria: 'Updated Criteria' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ranking_criteria', 'Updated Criteria');
  });

  test('DELETE /api/rankings/:playerId should delete a specific player\'s ranking', async () => {
    const response = await request(app).delete('/api/rankings/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Player ranking deleted successfully');
  });
});
