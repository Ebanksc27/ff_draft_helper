const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.name;
    let query = 'SELECT * FROM players';
    let params = [];

    if (searchTerm) {
      query += ' WHERE LOWER(name) LIKE $1';
      params.push(`%${searchTerm.toLowerCase()}%`);
    }

    const allPlayers = await db.query(query, params);
    res.json(allPlayers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

