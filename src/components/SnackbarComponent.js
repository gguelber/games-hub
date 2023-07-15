import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const SnackbarComponent = ({
  openSnackBar,
  handleCloseSnackbar,
  snackbarSeverity,
  snackbarMessage,
}) => {
  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
