import React, { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginCard = ({ login }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
      password: '',
    },
  });

  const { errors } = formState;

  const onSubmit = ({ email, password }) => {
    setLoadingButton(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSnackbarMessage('Logged in successifully');
        setSnackbarSeverity('success');
        setOpenSnackBar(true);

        setTimeout(() => {
          setLoadingButton(false);
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setSnackbarMessage('User not found.');
        } else if (error.code === 'auth/wrong-password') {
          setSnackbarMessage('Password incorrect.');
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
              Sign In
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
              id='email-input'
              variant='outlined'
              size='small'
              type='text'
              label='E-mail'
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ m: 1.5, width: '100%' }}
            />
            <TextField
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'At least 6 characters long.',
                },
              })}
              id='password-input'
              type={showPassword ? 'text' : 'password'}
              size='small'
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
              label='Password'
              sx={{ m: 1.5, width: '100%' }}
            />
            <Link
              to='/auth'
              onClick={() => login('reset')}
              style={{
                color: '#266798',
                fontSize: 14,
                alignSelf: 'end',
              }}
            >
              Forgot your password?
            </Link>
            <Button
              type='submit'
              variant='contained'
              disabled={loadingButton}
              sx={{ mt: 2.5, mb: 1.5 }}
              endIcon={
                loadingButton ? (
                  <CircularProgress
                    size={17}
                    sx={{ color: 'gray', opacity: 0.7 }}
                  />
                ) : (
                  <LoginIcon />
                )
              }
            >
              Sign In
            </Button>
            <Typography textAlign='center' sx={{ mt: 2 }}>
              Not a member?{' '}
              <Link
                to='/auth'
                onClick={() => login('register')}
                style={{ color: '#266798' }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

export default LoginCard;
