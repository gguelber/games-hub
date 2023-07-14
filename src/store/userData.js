import { createSlice } from '@reduxjs/toolkit';

const initialUserDataState = {
  user: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: initialUserDataState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice.reducer;
