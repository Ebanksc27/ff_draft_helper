const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authenticateToken'); 

// Endpoint to get all players, including their favorite status for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Obtain the user's ID from the authentication token
    const userId = req.user.id; 

    // Retrieve the search term from query parameters, if provided
    const searchTerm = req.query.name;

    // Base query to join players with favorites and determine favorite status
    let query = `
      SELECT p.*, 
             CASE WHEN f.player_id IS NOT NULL THEN true ELSE false END as isFavorite
      FROM players p
      LEFT JOIN favorites f ON p.player_id = f.player_id AND f.user_id = $1`;

    // Initialize parameters array with the user ID
    let params = [userId];

    // If a search term is provided, add a WHERE clause to filter players by name
    if (searchTerm) {
      query += ' WHERE LOWER(p.name) LIKE $2';
      params.push(`%${searchTerm.toLowerCase()}%`);
    }

    // Execute the query with the provided parameters
    const allPlayers = await db.query(query, params);

    // Respond with the fetched player data
    res.json(allPlayers.rows);
  } catch (err) {
    // Log and respond with an error message in case of a failure
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;


