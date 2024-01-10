const request = require('supertest');
const express = require('express');
const playersRoute = require('./players');

const app = express();
app.use(express.json());
app.use('/api/players', playersRoute);

// Mock the database module
jest.mock('../db', () => ({
  query: jest.fn().mockResolvedValue({
    rows: [{ player_id: 1, name: 'Test Player', position: 'QB', team_id: 'NE', status: 'Active' }]
  })
}));

describe('Players Route', () => {
  test('GET /api/players should return all players', async () => {
    const response = await request(app).get('/api/players');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          player_id: expect.any(Number),
          name: expect.any(String),
          position: expect.any(String),
          team_id: expect.any(String),
          status: expect.any(String)
        })
      ])
    );
  });
});
