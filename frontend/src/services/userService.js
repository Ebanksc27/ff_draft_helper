import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/users'; 

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token); // Store the token
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

// Add other user-related functions as needed

export { registerUser, loginUser };
