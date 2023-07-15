import { Box, Pagination, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { paginationModeActions } from '../store/paginationMode';

const PaginationComponent = ({
  prePaginatedListLength,
  pageSize,
  currentPage,
  mainPage,
}) => {
  const dispatch = useDispatch();

  return (
    <Box display='flex' flexDirection='column' alignItems='center' p={2}>
      <Typography mb={2}>Pages</Typography>
      <Pagination
        count={Math.ceil(prePaginatedListLength / pageSize)}
        variant='outlined'
        page={currentPage}
        onChange={(event, page) => {
          mainPage
            ? dispatch(paginationModeActions.setCurrentPage(page))
            : dispatch(paginationModeActions.setFavoritesCurrentPage(page));
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
