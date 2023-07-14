import { configureStore } from '@reduxjs/toolkit';
import gameFilterReducer from './gameFilter';
import darkModeReducer from './darkMode';
import userDataReducer from './userData';
import animationModeReducer from './animationMode';

const store = configureStore({
  reducer: {
    gameFilter: gameFilterReducer,
    darkMode: darkModeReducer,
    userData: userDataReducer,
    animationMode: animationModeReducer,
  },
});

export default store;
