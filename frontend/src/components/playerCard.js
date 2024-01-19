import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Modal } from '@mui/material';

const PlayerCard = ({ player }) => {
  const [openModal, setOpenModal] = useState(false);

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Placeholder function for handling the favorite action
  const handleFavorite = (event, playerId) => {
    event.stopPropagation(); // Prevents the modal from opening when clicking on the favorite button
    console.log(`Favorite player: ${playerId}`);
    // Implement favorite logic here
  };

  // Extract the stats from the player data
  const { age, height, weight, college } = player.stats;

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }} onClick={handleOpenModal}>
        <CardContent>
          <Typography variant="h5">{player.name}</Typography>
          <Typography color="textSecondary">{player.position} - {player.team_id}</Typography>
          {/* Display additional player details */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Status: {player.status}</Typography>
          </Box>
        </CardContent>
        {/* Placeholder for favorite button */}
        <Button size="small" onClick={(event) => handleFavorite(event, player.player_id)}>Favorite</Button>
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
            Team: {player.team_id}
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
          {/* Close button for the modal */}
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default PlayerCard;
