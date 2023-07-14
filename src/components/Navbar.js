import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Snackbar,
  Switch,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';

import { signOut } from 'firebase/auth';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darkModeActions } from '../store/darkMode';
import { gameFilterActions } from '../store/gameFilter';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';

// Custom Toolbar component
const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

// Custom Switch component
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 54,
  height: 26,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 24,
    height: 24,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Navbar = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.user);
  const favoritesList = useSelector((state) => state.gameFilter.favoritesList);
  const badgeClass = useSelector((state) => state.animationMode.badgeClass);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut(auth)
      .then(() => {
        setSnackbarMessage('Logged out');
        setSnackbarSeverity('success');
        setOpenSnackBar(true);
      })
      .catch((error) => {
        setSnackbarMessage(error.code);
        setSnackbarSeverity('error');
        setOpenSnackBar(true);
      });
  };
  // Store the state for light and dark mode
  const darkModeBool = useSelector((state) => state.darkMode.darkModeBool);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle the dark mode's switch and state
  const handleDarkMode = (event) => {
    event.target.checked
      ? dispatch(darkModeActions.setDarkMode('dark'))
      : dispatch(darkModeActions.setDarkMode('light'));
    dispatch(darkModeActions.setDarkModeBool(event.target.checked));
  };

  const handleHomeMenu = () => {
    navigate('/');
    handleMenuClose();
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkModeBool ? '#121212' : '#FFFFFF';
  }, [darkModeBool]);

  return (
    <AppBar position='sticky'>
      <StyledToolBar>
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
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleHomeMenu}>Home</MenuItem>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2, display: { lg: 'none' } }}
          onClick={() => dispatch(gameFilterActions.setDrawerOpener())}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          GAMES HUB
        </Typography>
        <SportsEsportsIcon
          fontSize='large'
          sx={{ display: { xs: 'block', sm: 'none' }, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <Box>
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={darkModeBool}
            onChange={handleDarkMode}
          />

          {user ? (
            <>
              <IconButton
                size='medium'
                aria-label='favorites-page-button'
                color={'text.primary'}
                onClick={() => navigate('favorites')}
                sx={{ mr: 1 }}
              >
                <Badge
                  badgeContent={favoritesList.length}
                  color='secondary'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <FavoriteIcon
                    color='error'
                    fontSize='medium'
                    className={badgeClass}
                  />
                </Badge>
              </IconButton>

              <IconButton
                size='small'
                edge='end'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuOpen}
                color='inherit'
              >
                <Avatar
                  sx={{
                    width: { xs: 32, sm: 33, md: 36 },
                    height: { xs: 32, sm: 33, md: 36 },
                  }}
                >
                  {user.email.substr(0, 1).toUpperCase()}
                </Avatar>
              </IconButton>
            </>
          ) : location.pathname === '/favorites' ? (
            <Button
              color='inherit'
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Button>
          ) : (
            <Button
              color='inherit'
              onClick={() => {
                location.pathname === '/auth'
                  ? navigate('/')
                  : navigate('auth');
              }}
            >
              {location.pathname === '/auth' ? 'Home' : 'Login'}
            </Button>
          )}
        </Box>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
