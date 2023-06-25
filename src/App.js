import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import './App.css';
import Main from './components/Main';
import { useSelector } from 'react-redux';

function App() {
  const darkMode = useSelector(
    (state) => state.darkMode.darkMode
  );

  const darkTheme = createTheme({
    palette: {
      mode: darkMode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        bgcolor={'background.default'}
        color={'text.primary'}
      >
        <Navbar />
        <Main />
      </Box>
    </ThemeProvider>
  );
}

export default App;
