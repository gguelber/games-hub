import { createSlice } from '@reduxjs/toolkit';

const initialFilterState = {
  drawerOpener: false,
  gameTitle: '',
  selectedGenre: '',
  selectedPlatform: '',
  selectedSorting: '',
  selectedRating: '',
  clickedGame: {},
  gamesList: [],
  favoritesList: [],
  ratingsList: [],
  totalFavoritesList: [],
  totalRatingsList: [],
  paginationMode: true,
  favoritesPaginationMode: false,
};

const gameFilterSlice = createSlice({
  name: 'gameFilter',
  initialState: initialFilterState,
  reducers: {
    setDrawerOpener(state) {
      state.drawerOpener = !state.drawerOpener;
    },
    setTitleFilter(state, action) {
      state.gameTitle = action.payload;
    },
    setGenreFilter(state, action) {
      state.selectedGenre = action.payload;
    },
    setPlatformFilter(state, action) {
      state.selectedPlatform = action.payload;
    },
    setClickedGame(state, action) {
      state.clickedGame = action.payload;
    },
    setGamesList(state, action) {
      state.gamesList = action.payload;
    },
    setSortingFilter(state, action) {
      state.selectedSorting = action.payload;
    },
    setRatingFilter(state, action) {
      state.selectedRating = action.payload;
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
    setPaginationMode(state) {
      state.paginationMode = !state.paginationMode;
    },
    setFavoritesPaginationMode(state) {
      state.favoritesPaginationMode = !state.favoritesPaginationMode;
    },
    resetFilter(state) {
      state.gameTitle = '';
      state.selectedGenre = '';
      state.selectedPlatform = '';
      state.selectedSorting = '';
      state.selectedRating = '';
    },
  },
});

export const gameFilterActions = gameFilterSlice.actions;

export default gameFilterSlice.reducer;
