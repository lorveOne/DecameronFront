import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light', // o 'dark'
    primary: {
      main: '#1976d2', // azul
    },
    secondary: {
      main: '#FFFFFF', // morado
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
      color: '#fff',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        
        root: {
          backgroundColor: '#1976d',
          '&:hover': {
            backgroundColor: '#fff',
            color: 'black', 
          },
          color: '#black',
          borderRadius: '8px', 
        },
      },
    },
  },


});
