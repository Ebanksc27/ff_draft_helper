const express = require('express');
const db = require('../db');
const authenticateToken = require('../authenticateToken');
const router = express.Router();

// Add a player to favorites
router.post('/:userId', authenticateToken, async (req, res) => {
    console.log('POST to /:userId'); // Log when route is hit
    const { userId } = req.params;
    const { playerId } = req.body;
  
    try {
      await db.query('INSERT INTO favorites (user_id, player_id) VALUES ($1, $2)', [Number(userId), playerId]);
      res.status(200).json({ message: 'Player added to favorites' });
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).send('Server error: ' + error.message);
    }
  });

// Remove a player from favorites
router.delete('/:userId/:playerId', authenticateToken, async (req, res) => {
    console.log('DELETE to /:userId/:playerId'); // Log when route is hit
    const { userId, playerId } = req.params;
  
    try {
      await db.query('DELETE FROM favorites WHERE user_id = $1 AND player_id = $2', [Number(userId), Number(playerId)]);
      res.status(200).json({ message: 'Player removed from favorites' });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).send('Server error');
    }
  });

// Get user's favorite players
router.get('/:userId', authenticateToken, async (req, res) => {
  console.log('GET to /:userId'); // Log when route is hit
  const { userId } = req.params;

  try {
    const favorites = await db.query('SELECT * FROM players WHERE player_id IN (SELECT player_id FROM favorites WHERE user_id = $1)', [userId]);
    res.status(200).json(favorites.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;


