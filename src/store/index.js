import { configureStore } from '@reduxjs/toolkit';
import gameFilterReducer from './gameFilter';
import darkModeReducer from './darkMode';
import userDataReducer from './userData';
import animationModeReducer from './animationMode';
import paginationModeReducer from './paginationMode';

const store = configureStore({
  reducer: {
    gameFilter: gameFilterReducer,
    darkMode: darkModeReducer,
    userData: userDataReducer,
    animationMode: animationModeReducer,
    paginationMode: paginationModeReducer,
  },
});

export default store;
