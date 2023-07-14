import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = {
  drawerOpener: false,
  titleFilter: '',
  genreFilter: '',
  platformFilter: '',
  sortingFilter: '',
  ratingFilter: '',
  clickedGame: {},
  gamesList: [],
  favoritesList: [],
  ratingsList: [],
  totalFavoritesList: [],
  totalRatingsList: [],
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
    setRatingFilter(state, action) {
      state.ratingFilter = action.payload;
    },
    setFavoritesList(state, action) {
      state.favoritesList = action.payload;
    },
    setRatingsList(state, action) {
      state.ratingsList = action.payload;
    },
    setTotalFavoritesList(state, action) {
      state.totalFavoritesList = action.payload;
    },
    setTotalRatingsList(state, action) {
      state.totalRatingsList = action.payload;
    },
    resetFilter(state) {
      state.titleFilter = '';
      state.genreFilter = '';
      state.platformFilter = '';
      state.sortingFilter = '';
      state.ratingFilter = '';
    },
  },
});

export const gameFilterActions = gameFilterSlice.actions;

export default gameFilterSlice.reducer;
