import { createSlice } from '@reduxjs/toolkit';

const initialDarkModeState = {
  darkMode: 'dark',
  darkModeBool: true,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialDarkModeState,
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
    setDarkModeBool(state, action) {
      state.darkModeBool = action.payload;
    },
  },
});

export const darkModeActions = darkModeSlice.actions;

export default darkModeSlice.reducer;
