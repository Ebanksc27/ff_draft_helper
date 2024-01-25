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
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];

      // Log user data to console to verify
      console.log("User data:", user);

      // Compare the provided password with the stored hash
      const isValid = await bcrypt.compare(password, user.password_hash);

      if (isValid) {
        // Log the JWT payload to console to verify
        const payload = {
          user_id: user.user_id,
          username: user.username
        };
        console.log("JWT Payload:", payload);

        // User is authenticated, create token
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        console.log("Generated JWT Token:", token);

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
