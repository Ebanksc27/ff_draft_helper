import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', 
    },
    secondary: {
      main: '#19857b', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.2rem',
    },
    // ... other typography settings
  },
  // ... other theme settings like spacing, breakpoints
});

export default theme;
