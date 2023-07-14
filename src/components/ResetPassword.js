import React, { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import KeyIcon from '@mui/icons-material/Key';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = ({ login }) => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const { errors } = formState;

  const onSubmit = ({ email }) => {
    setLoadingButton(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSnackbarMessage(`Reset password link sent to ${email}`);
        setSnackbarSeverity('success');
        setOpenSnackBar(true);

        setTimeout(() => {
          setLoadingButton(false);
          login('login');
        }, 1000);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setSnackbarMessage('User not found.');
        } else if (error.code === 'auth/invalid-email') {
          setSnackbarMessage('Please provide a valid e-mail address.');
        } else if (error.code === 'auth/too-many-requests') {
          setSnackbarMessage('Too many requests.');
        } else {
          setSnackbarMessage(error.code);
        }
        setLoadingButton(false);
        setSnackbarSeverity('error');
        setOpenSnackBar(true);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={2000}
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
        <Paper elevation={5} sx={{ p: 4, mx: 4, my: 4 }}>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='h5' sx={{ mt: 1, mb: 3 }}>
              Reset Password
            </Typography>
            <TextField
              {...register('email', {
                required: 'E-mail is required.',
                pattern: {
                  value:
                    /^[\sa-zA-Z0-9._-]+@[a-zA-Z0-9]{2,}.[a-zA-Z]{2,}(.?[a-z\s]{2,})?$/gm,
                  message: 'Invalid e-mail address.',
                },
              })}
              id='email-reset'
              size='small'
              type='text'
              label='E-mail'
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ m: 1.5, width: '100%' }}
            />

            <Button
              type='submit'
              variant='contained'
              disabled={loadingButton}
              sx={{ m: 1.5, mb: 2.5 }}
              endIcon={
                loadingButton ? (
                  <CircularProgress
                    size={17}
                    sx={{ color: 'gray', opacity: 0.7 }}
                  />
                ) : (
                  <KeyIcon />
                )
              }
            >
              Reset
            </Button>

            <Link
              to='/auth'
              onClick={() => login('login')}
              style={{ color: '#266798' }}
            >
              Back to login
            </Link>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

export default ResetPassword;
