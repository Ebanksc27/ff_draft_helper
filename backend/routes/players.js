const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', async (req, res) => {
  try {
    const allPlayers = await db.query('SELECT * FROM players');
    res.json(allPlayers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
