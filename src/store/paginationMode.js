import { createSlice } from '@reduxjs/toolkit';

const initialPaginationState = {
  isPaginationActive: true,
  isFavoritesPaginationActive: false,
  pageSize: 10,
  favoritesPageSize: 10,
  currentPage: 1,
  favoritesCurrentPage: 1,
  prePaginatedListLength: 0,
  favoritesPrePaginatedListLength: 0,
};

const paginationModeSlice = createSlice({
  name: 'paginationMode',
  initialState: initialPaginationState,
  reducers: {
    setIsPaginationActive(state) {
      state.isPaginationActive = !state.isPaginationActive;
    },
    setIsFavoritesPaginationActive(state) {
      state.isFavoritesPaginationActive = !state.isFavoritesPaginationActive;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setFavoritesPageSize(state, action) {
      state.favoritesPageSize = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFavoritesCurrentPage(state, action) {
      state.favoritesCurrentPage = action.payload;
    },
    setPrePaginatedListLength(state, action) {
      state.prePaginatedListLength = action.payload;
    },
    setFavoritesPrePaginatedListLength(state, action) {
      state.favoritesPrePaginatedListLength = action.payload;
    },
  },
});

export const paginationModeActions = paginationModeSlice.actions;

export default paginationModeSlice.reducer;
