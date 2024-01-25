import React, { useState } from 'react';
import axios from 'axios';
import PlayerCard from './playerCard';
import { TextField, Button, Box } from '@mui/material';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch player data based on search query
  const fetchPlayers = async () => {
    if (!searchQuery.trim()) return;
    
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/players?name=${searchQuery}`, { headers });
      setPlayers(response.data); // Update player data with response, including isFavorite status
    } catch (err) {
      setError(err.message || 'Failed to fetch players.');
    } finally {
      setLoading(false);
    }
  };

  // Handle favorite status update
  const updateFavoriteStatus = (playerId, newStatus) => {
    setPlayers(players.map(player =>
      player.player_id === playerId ? { ...player, isFavorite: newStatus } : player
    ));
  };

  // Handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlayers();
  };

  return (
    <div>
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

      {loading && <div>Loading players...</div>}
      {error && <div>Error fetching players: {error}</div>}
      {!loading && !error && players.map((player) => (
        <PlayerCard key={player.player_id} player={player} updateFavoriteStatus={updateFavoriteStatus} />
      ))}
    </div>
  );
};

export default PlayerList;