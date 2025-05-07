import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ open, message, severity = 'success', onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
