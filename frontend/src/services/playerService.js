import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Helper function to get the stored token
const getAuthToken = () => {
  return localStorage.getItem('token'); 
};

const fetchPlayers = async (searchTerm) => {
    const token = getAuthToken(); // Retrieve the JWT token using getAuthToken
    const headers = {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    };
  
    try {
      const response = await axios.get(`${BASE_URL}/players?name=${encodeURIComponent(searchTerm)}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
};

const getFavorites = async (userId) => {
    const token = getAuthToken(); // Use getAuthToken to retrieve the JWT token
    try {
        const response = await axios.get(`${BASE_URL}/api/favorites/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

export { fetchPlayers, getFavorites, getAuthToken };



