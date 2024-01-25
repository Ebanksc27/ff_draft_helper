import { jwtDecode } from 'jwt-decode';

// Check if the user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Log out the user
export const logout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/login'); 
};

// Get the username from the JWT token
export const getUsername = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.username; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};
