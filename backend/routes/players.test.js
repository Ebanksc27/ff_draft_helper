const request = require('supertest');
const express = require('express');
const playersRoute = require('./players');
const db = require('../db');

const app = express();
app.use(express.json());
app.use('/api/players', playersRoute);

// Mock the database module
jest.mock('../db', () => ({
  query: jest.fn().mockResolvedValue({
    rows: [{ player_id: 1, name: 'Test Player', position: 'QB', team_id: 'NE', status: 'Active', isFavorite: false }]
  })
}));

// Mock the authentication middleware
jest.mock('../authenticateToken', () => (req, res, next) => {
  req.user = { id: 1 };
  next();
});

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
          status: expect.any(String),
          isFavorite: expect.any(Boolean)
        })
      ])
    );
  });
});

describe('Players Route with Search and Favorite Status', () => {
  test('GET /api/players with search query should return filtered players with favorite status', async () => {
    // Mock the database response for a specific search query
    db.query.mockResolvedValueOnce({
      rows: [{ player_id: 2, name: 'Tom Brady', position: 'QB', team_id: 'TB', status: 'Active', isFavorite: true }]
    });

    const response = await request(app).get('/api/players?search=tom');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          player_id: 2,
          name: 'Tom Brady',
          position: 'QB',
          team_id: 'TB',
          status: 'Active',
          isFavorite: true 
        })
      ])
    );
    expect(response.body).toHaveLength(1); // Expect only one player in the response
  });

  test('GET /api/players with search query for non-existing player should return empty array', async () => {
    // Mock an empty response for a non-matching search query
    db.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).get('/api/players?search=nonexistingplayer');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]); // Expect an empty array
  });
});
