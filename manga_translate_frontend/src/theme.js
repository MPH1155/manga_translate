import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ffffff',
    },
    tertiary: {
      main: '#1a1a1a',
    },
    background: {
      default: '#000000',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'SF Pro Display, Arial, sans-serif',
    allVariants: {
        color: '#ffffff', // Ensure all text variants use white color
    },
  },
});

export default theme;