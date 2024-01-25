import React, { useState, useEffect } from 'react';
import { getFavorites } from '../services/playerService'; 
import { Box, Typography, CircularProgress } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const { user_id } = jwtDecode(token);
                const fetchedFavorites = await getFavorites(user_id);
                setFavorites(fetchedFavorites);
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('Error fetching favorites');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ margin: '20px' }}>
            <Typography variant="h4">Favorites</Typography>
            {favorites.map((player) => (
                <Typography key={player.player_id}>{player.name}</Typography>
            ))}
        </Box>
    );
};

export default FavoritesList;
