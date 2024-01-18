const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Insert the new user into the database
      const newUser = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email',
        [username, email, hashedPassword]
      );
  
      // Respond with the new user (excluding the password)
      res.status(201).json(newUser.rows[0]);
    } catch (error) {
      // Handle errors (e.g., user already exists, etc.)
      res.status(500).json({ error: error.message });
    }
  });  

// POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Retrieve user from the database
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (user.rows.length > 0) {
        // Compare the provided password with the stored hash
        const isValid = await bcrypt.compare(password, user.rows[0].password_hash);
  
        if (isValid) {
          // Debugging: Log the JWT Secret to the console
          console.log('JWT Secret:', process.env.JWT_SECRET);
  
          // User is authenticated, create token
          const token = jwt.sign(
            { 
              user_id: user.rows[0].user_id, 
              username: user.rows[0].username 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
  
          // Send the token as a response
          res.json({ token });
        } else {
          // Password is incorrect, send an error response
          res.status(400).json({ error: 'Invalid password' });
        }
      } else {
        // No user found with that email, send an error response
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
