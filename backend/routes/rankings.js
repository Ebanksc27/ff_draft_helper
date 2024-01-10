const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authenticateToken');

// GET /api/rankings to retrieve player rankings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const rankings = await db.query('SELECT * FROM player_rankings ORDER BY rank');
    res.json(rankings.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/rankings/:playerId to retrieve a specific player's ranking
router.get('/:playerId', authenticateToken, async (req, res) => {
  const playerId = req.params.playerId;
  try {
    const ranking = await db.query('SELECT * FROM player_rankings WHERE player_id = $1', [playerId]);
    if (ranking.rows.length === 0) {
      return res.status(404).json({ error: 'Player ranking not found' });
    }
    res.json(ranking.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/rankings/:playerId to update a specific player's ranking
router.put('/:playerId', authenticateToken, async (req, res) => {
  const playerId = req.params.playerId;
  const { rank, ranking_criteria } = req.body; 
  try {
    const updatedRanking = await db.query(
      'UPDATE player_rankings SET rank = $1, ranking_criteria = $2 WHERE player_id = $3 RETURNING *',
      [rank, ranking_criteria, playerId]
    );
    if (updatedRanking.rows.length === 0) {
      return res.status(404).json({ error: 'Player ranking not found or no update made' });
    }
    res.json(updatedRanking.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/rankings/:playerId to delete a specific player's ranking
router.delete('/:playerId', authenticateToken, async (req, res) => {
  const playerId = req.params.playerId;
  try {
    const result = await db.query('DELETE FROM player_rankings WHERE player_id = $1 RETURNING *', [playerId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Player ranking not found' });
    }
    res.json({ message: 'Player ranking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
