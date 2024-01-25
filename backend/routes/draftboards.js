const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authenticateToken'); 

// POST /api/draftboards to create a new draftboard
router.post('/', authenticateToken, async (req, res) => {
    const userId = req.user.user_id; 
    try {
      // Initialize the draftboard with default structure
      const defaultDraftboard = {
        QB: [], RB: [], WR: [], TE: [], K: []
      };
  
      const newDraftboard = await db.query(
        'INSERT INTO draftboards (user_id, players) VALUES ($1, $2) RETURNING *',
        [userId, JSON.stringify(defaultDraftboard)] // Save the default structure as JSON
      );
      res.status(201).json(newDraftboard.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// GET /api/draftboards/:userId to retrieve a user's draftboard or create one if it does not exist
router.get('/:userId', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        let draftboard = await db.query(
            'SELECT * FROM draftboards WHERE user_id = $1',
            [userId]
        );
        if (draftboard.rows.length === 0) {
            // Draftboard not found, create a new one
            draftboard = await db.query(
                'INSERT INTO draftboards (user_id, players) VALUES ($1, $2) RETURNING *',
                [userId, '{}'] // initializing with an empty JSON object
            );
        }
        res.json(draftboard.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/draftboards/:userId to update a user's draftboard
router.put('/:userId', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { players } = req.body; 
    try {
        const updatedDraftboard = await db.query(
            'UPDATE draftboards SET players = $1 WHERE user_id = $2 RETURNING *',
            [players, userId]
        );
        res.json(updatedDraftboard.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/draftboards/:userId to delete a user's draftboard
router.delete('/:userId', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        await db.query('DELETE FROM draftboards WHERE user_id = $1', [userId]);
        res.json({ message: 'Draftboard deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
