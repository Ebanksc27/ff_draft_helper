import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getUsername, logout as performLogout } from '../services/auth';

function Header() {
  const navigate = useNavigate();
  const username = getUsername(); 

  const logout = () => {
    performLogout(navigate);
  };

  return (
    <AppBar position="static" color="primary" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fantasy Football Draft Helper
        </Typography>

        {/* Display these buttons only if the user is logged in */}
        {isLoggedIn() ? (
          <>
            <Button color="inherit" onClick={() => navigate(isLoggedIn() ? '/dashboard' : '/login')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/players')}>Players</Button>
            <Button color="inherit" onClick={() => navigate('/drafts')}>Draft Board</Button>
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {username}
            </Typography>
            <Button color="inherit" onClick={logout}>Log Out</Button>
          </>
        ) : (
          <>
            {/* Display these buttons if the user is not logged in */}
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;


 