import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme'; // Aquí va tu configuración de tema global
import App from '../App'; // Tu componente principal

const MuiProvider: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset global de estilos */}
      <App /> {/* Renderiza el componente App */}
    </ThemeProvider>
  );
};

export default MuiProvider;
