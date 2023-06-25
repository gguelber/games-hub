import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = {
  drawerOpener: false,
  titleFilter: '',
  genreFilter: '',
  platformFilter: '',
  sortingFilter: '',
  clickedGame: {},
  gamesList: [],
  scrollPosition: 0,
};

const gameFilterSlice = createSlice({
  name: 'gameFilter',
  initialState: initialFilterState,
  reducers: {
    setDrawerOpener(state) {
      state.drawerOpener = !state.drawerOpener;
    },
    setTitleFilter(state, action) {
      state.titleFilter = action.payload;
    },
    setGenreFilter(state, action) {
      state.genreFilter = action.payload;
    },
    setPlatformFilter(state, action) {
      state.platformFilter = action.payload;
    },
    setClickedGame(state, action) {
      state.clickedGame = action.payload;
    },
    setGamesList(state, action) {
      state.gamesList = action.payload;
    },
    setSortingFilter(state, action) {
      state.sortingFilter = action.payload;
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },

    resetFilter(state) {
      state.titleFilter = '';
      state.genreFilter = '';
      state.platformFilter = '';
      state.sortingFilter = '';
    },
  },
});

export const gameFilterActions = gameFilterSlice.actions;

export default gameFilterSlice.reducer;
