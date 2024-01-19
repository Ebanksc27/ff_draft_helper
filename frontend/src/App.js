import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import LoginForm from './components/auth/loginForm'; 
import RegisterForm from './components/auth/registerForm'; 
import DraftList from './components/drafts/draftList'; 
import Dashboard from './components/Dashboard';
import PlayerList from './components/playerList';
import { isLoggedIn } from './services/auth';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/drafts" element={<DraftList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/players" element={<PlayerList />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;






