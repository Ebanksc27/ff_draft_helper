import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Helper function to get the stored token
const getAuthToken = () => {
  return localStorage.getItem('token'); 
};

const fetchPlayers = async (searchTerm) => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
    const headers = {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    };
  
    try {
        console.log('Authorization header:', headers);
      const response = await axios.get(`${BASE_URL}/players?name=${encodeURIComponent(searchTerm)}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  };

export { fetchPlayers, getAuthToken };


