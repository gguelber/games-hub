import React, { useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';

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
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';

const CreateAccountCard = ({ login }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
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
  const handleClickShowConfirmationPassword = () =>
    setShowConfirmationPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmationPassword = (event) => {
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
      passwordConfirmation: '',
    },
  });

  const { errors } = formState;

  const onSubmit = async ({ email, password }) => {
    setLoadingButton(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSnackbarMessage('Account created successifull.');
        setLoadingButton(false);
        setSnackbarSeverity('success');
        setOpenSnackBar(true);

        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setSnackbarMessage('Please provide a valid e-mail address.');
        } else if (error.code === 'auth/email-already-in-use') {
          setSnackbarMessage('E-mail already in use.');
        } else if (error.code === 'auth/weak-password') {
          setSnackbarMessage(
            'Your password must contain at least 6 characters.'
          );
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
              Sign Up
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
            <TextField
              {...register('passwordConfirmation', {
                validate: (value) =>
                  value === getValues('password') || "Passwords doesn't match.",
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'At least 6 characters long.',
                },
              })}
              id='confirm-password-input'
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
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
              label='Confirm password'
              sx={{ m: 1.5, width: '100%' }}
            />

            <Button
              type='submit'
              variant='contained'
              disabled={loadingButton}
              sx={{ m: 1.5 }}
              endIcon={
                loadingButton ? (
                  <CircularProgress
                    size={17}
                    sx={{ color: 'gray', opacity: 0.7 }}
                  />
                ) : (
                  <HowToRegIcon />
                )
              }
            >
              Sign up
            </Button>
            <Typography textAlign='center' sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link
                to='/auth'
                onClick={() => login('login')}
                style={{ color: '#266798' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

export default CreateAccountCard;
