import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import './App.css';
import Main from './pages/Main';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Favorites from './pages/Favorites';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { userDataActions } from './store/userData';
import { gameFilterActions } from './store/gameFilter';
import Footer from './components/Footer';

function App() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode,
    },
  });

  // Firebase authentication listener to handle user changes and set states
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        userDataActions.setUserData({ uid: user.uid, email: user.email })
      );
    } else {
      dispatch(userDataActions.setUserData(null));
      dispatch(gameFilterActions.setFavoritesList([]));
      dispatch(gameFilterActions.setRatingsList([]));
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
