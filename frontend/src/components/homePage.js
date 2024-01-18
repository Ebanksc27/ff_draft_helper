import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout as performLogout, getUsername } from '../services/auth';

const HomePage = () => {
  const navigate = useNavigate();

  const logout = () => {
    performLogout();
    navigate('/login');
  };

  return (
    <div>
      {isLoggedIn() ? (
        <div>
          <h1>Welcome, {getUsername()}!</h1>
          <h2>Your Dashboard</h2>
          <button onClick={logout}>Log Out</button>
          {/* Dashboard content */}
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
          <p>Manage your fantasy football drafts with ease.</p>
          {/* Calls to action for Sign Up or Learn More */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
