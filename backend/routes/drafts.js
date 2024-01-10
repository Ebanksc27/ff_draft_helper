const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authenticateToken');

// POST /api/drafts to create a new draft
router.post('/', authenticateToken, async (req, res) => {
  const { draftName, draftDate } = req.body; 
  try {
    const newDraft = await db.query(
      'INSERT INTO drafts (user_id, players_picked, draft_date) VALUES ($1, ARRAY[]::INTEGER[], $2) RETURNING *',
      [req.user.user_id, draftDate]
    );
    res.status(201).json(newDraft.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/drafts/:id to retrieve a specific draft
router.get('/:id', authenticateToken, async (req, res) => {
  const draftId = req.params.id;
  try {
    const draft = await db.query('SELECT * FROM drafts WHERE draft_id = $1', [draftId]);
    if (draft.rows.length === 0) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json(draft.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/drafts/:id to update a specific draft (e.g., adding a player to the draft)
router.put('/:id', authenticateToken, async (req, res) => {
  const draftId = req.params.id;
  const { playersPicked } = req.body; 
  try {
    const updatedDraft = await db.query(
      'UPDATE drafts SET players_picked = $1 WHERE draft_id = $2 RETURNING *',
      [playersPicked, draftId]
    );
    if (updatedDraft.rows.length === 0) {
      return res.status(404).json({ error: 'Draft not found or no update made' });
    }
    res.json(updatedDraft.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/drafts/:id to delete a specific draft
router.delete('/:id', authenticateToken, async (req, res) => {
  const draftId = req.params.id;
  try {
    const result = await db.query('DELETE FROM drafts WHERE draft_id = $1 RETURNING *', [draftId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json({ message: 'Draft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/drafts to list all drafts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const drafts = await db.query('SELECT * FROM drafts');
    res.json(drafts.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
