import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography, Paper, Grid, Box, CircularProgress } from '@mui/material';
import { getDraftboard, updateDraftboard } from '../../services/draftService';
import { jwtDecode } from 'jwt-decode';

const DraftBoard = () => {
    const [draftBoard, setDraftBoard] = useState({
      QB: [], RB: [], WR: [], TE: [], K: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchDraftboardData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const { user_id } = jwtDecode(token);
          const response = await getDraftboard(user_id);
          console.log("API Response:", response);
  
          // Assuming the 'players' data is directly in the response object
          let playersData = response.players;
          if (typeof playersData === 'string') {
            playersData = JSON.parse(playersData);
          }
  
          if (playersData && typeof playersData === 'object') {
            setDraftBoard({
              QB: playersData.QB || [],
              RB: playersData.RB || [],
              WR: playersData.WR || [],
              TE: playersData.TE || [],
              K: playersData.K || []
            });
          } else {
            throw new Error('Invalid draftboard data');
          }
        } catch (err) {
          console.error('Failed to load draftboard', err);
          setError('Failed to load draftboard');
        } finally {
          setLoading(false);
        }
      };
  
      fetchDraftboardData();
    }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const newDraftBoard = { ...draftBoard };
    const [removedPlayer] = newDraftBoard[source.droppableId].splice(source.index, 1);
    newDraftBoard[destination.droppableId].splice(destination.index, 0, removedPlayer);

    setDraftBoard(newDraftBoard);

    try {
      const token = localStorage.getItem('token');
      const { user_id } = jwtDecode(token);
      await updateDraftboard(user_id, newDraftBoard);
      console.log('Draftboard updated successfully');
    } catch (error) {
      console.error('Error updating draftboard:', error);
      // Optionally handle the error in the UI
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {Object.keys(draftBoard).map((position) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={position}>
              <Typography variant="h6">{position}</Typography>
              <Droppable droppableId={position}>
                {(provided) => (
                  <Paper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ minHeight: '150px', padding: '10px' }}
                  >
                    {draftBoard[position].map((player, index) => (
                      <Draggable key={player.player_id} draggableId={String(player.player_id)} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ marginBottom: '8px', padding: '10px', backgroundColor: 'lightgray', cursor: 'grab' }}
                          >
                            {player.name}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DragDropContext>
  );
};

export default DraftBoard;
