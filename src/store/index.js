import { configureStore } from '@reduxjs/toolkit';
import gameFilterReducer from './gameFilter';
import darkModeReducer from './darkMode';

const store = configureStore({
  reducer: {
    gameFilter: gameFilterReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
