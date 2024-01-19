import React, { useState } from 'react';
import axios from 'axios';
import PlayerCard from './playerCard';
import { TextField, Button, Box } from '@mui/material';

const PlayerList = () => {
  // State to store player data, loading status, error messages, and search query
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch player data based on search query
  const fetchPlayers = async () => {
    // Check if search query is empty, return early if true
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/players?name=${searchQuery}`);
      setPlayers(response.data); // Update player data with response
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); // Ensure loading state is false after fetch
    }
  };

  // Handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchPlayers(); // Call fetchPlayers to perform the search
  };

  return (
    <div>
      {/* Search form */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
        <TextField
          label="Search Players"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">Search</Button>
      </Box>

      {/* Conditional rendering based on state */}
      {loading && <div>Loading players...</div>}
      {error && <div>Error fetching players: {error}</div>}
      {!loading && !error && players.map((player) => (
        <PlayerCard key={player.player_id} player={player} />
      ))}
    </div>
  );
};

export default PlayerList;




