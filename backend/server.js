require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const fetchAndStoreNFLPlayers = require('./fetchPlayers'); 
const db = require('./db');
const playerRoutes = require('./routes/players');
const userRoutes = require('./routes/users');
const draftRoutes = require('./routes/drafts');
const rankingsRoutes = require('./routes/rankings');
const favoritesRoutes = require('./routes/favorites'); 
const draftboardRoutes = require('./routes/draftboards');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Player routes
app.use('/api/players', playerRoutes);

// User routes
app.use('/api/users', userRoutes);

// Draft routes
app.use('/api/drafts', draftRoutes);

// Rankings routes
app.use('/api/rankings', rankingsRoutes);

// Favorites routes
app.use('/api/favorites', favoritesRoutes);

// Draftboards routes
app.use('/api/draftboards', draftboardRoutes);

// Test database connection
db.query('SELECT NOW()', (err, res) => {
  if (err) throw err;
  console.log('PostgreSQL connected:', res.rows);
});

// Schedule the task to run once every 24 hours at midnight
cron.schedule('15 15 * * *', () => {
    console.log('Running a daily task to fetch and store NFL players');
    fetchAndStoreNFLPlayers();
}); 

// Root endpoint
app.get('/', (req, res) => {
  res.send('Fantasy Football Draft Helper Backend is running!');
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

