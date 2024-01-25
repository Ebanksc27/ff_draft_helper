import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, Modal } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const PlayerCard = ({ player, updateFavoriteStatus }) => {
  const [openModal, setOpenModal] = useState(false);

  // Display 'Free Agent' or 'N/A' if team_id is null
  const displayTeam = player.team_id ? player.team_id : 'Free Agent';

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFavorite = async (event, playerId) => {
    event.stopPropagation();

    const token = localStorage.getItem('token');
    let userId;

    try {
        const decoded = jwtDecode(token);
        userId = decoded.user_id; 
    } catch (error) {
        console.error('Error decoding token:', error);
        return; // Exit if token cannot be decoded
    }

    try {
        const url = `http://localhost:3000/api/favorites/${userId}`;
        const headers = { Authorization: `Bearer ${token}` };

        if (player.isFavorite) {
            await axios.delete(`${url}/${playerId}`, { headers });
        } else {
            await axios.post(url, { playerId }, { headers });
        }
        updateFavoriteStatus(playerId, !player.isFavorite);
    } catch (error) {
        console.error('Error updating favorite status:', error);
    }
};

  

  const { age, height, weight, college } = player.stats;

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }} onClick={handleOpenModal}>
        <CardContent>
          <Typography variant="h5">{player.name}</Typography>
          <Typography color="textSecondary">{player.position} - {displayTeam}</Typography>
          {/* Display additional player details */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Status: {player.status}</Typography>
          </Box>
        </CardContent>
        <Button size="small" onClick={(event) => handleFavorite(event, player.player_id)}>
          {player.isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </Card>

      {/* Modal for player details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="player-details-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ 
          position: 'absolute',
          backgroundColor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none' // Removes the default focus outline
        }}>
          <Typography id="player-details-title" variant="h6" component="h2">
            {player.name}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Team: {displayTeam}
          </Typography>
          <Typography>
            Position: {player.position}
          </Typography>
          <Typography>
            Status: {player.status}
          </Typography>
          <Typography>
            Age: {age}
          </Typography>
          <Typography>
            Height: {height} inches
          </Typography>
          <Typography>
            Weight: {weight} lbs
          </Typography>
          <Typography>
            College: {college}
          </Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default PlayerCard;