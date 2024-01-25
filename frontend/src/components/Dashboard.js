import React from 'react';
import { isLoggedIn, getUsername } from '../services/auth';

const Dashboard = () => {
  const username = getUsername(); 

  return (
    <div>
      <h1>Welcome{username ? `, ${username}` : ''}!</h1> 
      {isLoggedIn() ? (
        <div>
          <h2>Your Dashboard</h2>
          {/* More personalized components */}
        </div>
      ) : (
        <div>
          <p>Manage your fantasy football drafts with ease!
            - Search for players in the Players tab and add them to your favorites list! 
            - Head to the Draftboard to create a ranked list of up to ten players at each position!
          </p>
          {/* Calls to action for Sign Up or Learn More */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

