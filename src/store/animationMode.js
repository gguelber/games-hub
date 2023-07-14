import { createSlice } from '@reduxjs/toolkit';

const initialAnimationModeState = {
  badgeClass: '',
};

const animationModeSlice = createSlice({
  name: 'animationMode',
  initialState: initialAnimationModeState,
  reducers: {
    setBadgeClass(state, action) {
      state.badgeClass = action.payload;
    },
  },
});

export const animationModeActions = animationModeSlice.actions;

export default animationModeSlice.reducer;
