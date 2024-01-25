const request = require('supertest');
const express = require('express');
const favoritesRoutes = require('./favorites');
const db = require('../db');
const authenticateToken = require('../authenticateToken');

jest.mock('../db');

// Mock the authenticateToken middleware
jest.mock('../authenticateToken', () => jest.fn((req, res, next) => {
  req.user = { user_id: 1 }; // Mock user object
  next();
}));

const app = express();
app.use(express.json());
app.use(authenticateToken);
app.use('/api/favorites', favoritesRoutes);

describe('Favorites Routes', () => {
    beforeEach(() => {
        // Reset mock calls before each test
        db.query.mockReset();
    });

    test('POST /api/favorites/:userId adds a favorite player for a user', async () => {
        db.query.mockResolvedValue({ rows: [], rowCount: 1 });

        const response = await request(app)
            .post('/api/favorites/1')
            .send({ playerId: 123 });

        expect(response.statusCode).toBe(200);
        expect(db.query).toHaveBeenCalledWith(
            'INSERT INTO favorites (user_id, player_id) VALUES ($1, $2)', [1, 123]
        );
    });

    test('DELETE /api/favorites/:userId/:playerId removes a favorite player for a user', async () => {
        db.query.mockResolvedValue({ rows: [], rowCount: 1 });
    
        const response = await request(app)
            .delete('/api/favorites/1/123');
    
        expect(response.statusCode).toBe(200);
        expect(db.query).toHaveBeenCalledWith(
            'DELETE FROM favorites WHERE user_id = $1 AND player_id = $2', [1, 123]
        );
    });
    
    test('GET /api/favorites/:userId retrieves favorite players for a user', async () => {
        db.query.mockResolvedValue({ rows: [{ player_id: 123 }, { player_id: 456 }], rowCount: 2 });
    
        const response = await request(app).get('/api/favorites/1');
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ player_id: 123 }),
                expect.objectContaining({ player_id: 456 })
            ])
        );
    });
});
