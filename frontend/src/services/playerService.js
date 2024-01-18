import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

const fetchPlayers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/players`);
    return response.data;
  } catch (error) {
    // Handle errors here (e.g., logging or displaying error messages)
    console.error('Error fetching players:', error);
    throw error;
  }
};

export { fetchPlayers };
