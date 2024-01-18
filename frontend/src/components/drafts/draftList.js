import React, { useEffect, useState } from 'react';
import { getDrafts } from '../../services/draftService';
import { List, CircularProgress, Typography, Box, Card, CardContent, CardActions, Button } from '@mui/material';

function DraftList() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDrafts = () => {
    setLoading(true);
    getDrafts()
      .then(data => {
        setDrafts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load drafts. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDrafts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center">
        <Typography color="error">{error}</Typography>
        <Button onClick={loadDrafts}>Retry</Button>
      </Box>
    );
  }

  if (drafts.length === 0) {
    return <Typography>No drafts available.</Typography>;
  }

  return (
    <List>
      {drafts.map(draft => (
        <Card key={draft.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{draft.name}</Typography>
            {/* Add more draft details here */}
          </CardContent>
          <CardActions>
            <Button size="small">View Details</Button>
            {/* Add more actions here */}
          </CardActions>
        </Card>
      ))}
    </List>
  );
}

export default DraftList;
