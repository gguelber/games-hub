import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useDispatch } from 'react-redux';
import { paginationModeActions } from '../store/paginationMode';

const PaginationControl = ({
  isPaginationActive,
  pageSize,
  games,
  gamesList,
  mainPage,
}) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 'auto',
        mt: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 },
        textAlign: 'center',
        alignItems: 'center',
        width: 200,
      }}
    >
      {games && (
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          pb={4}
          alignItems='center'
        >
          <Box>
            <Typography variant='caption'>Pagination mode:</Typography>
            <Switch
              onChange={() => {
                mainPage
                  ? dispatch(paginationModeActions.setIsPaginationActive())
                  : dispatch(
                      paginationModeActions.setIsFavoritesPaginationActive()
                    );
              }}
              checked={isPaginationActive}
            />
          </Box>
          {isPaginationActive && (
            <FormControl sx={{ width: '80%' }}>
              <InputLabel id='page-size-select-label'>
                Games per page
              </InputLabel>
              <Select
                labelId='page-size-select-label'
                id='page-size-select'
                size='small'
                value={pageSize}
                label='Games per page'
                onChange={(event) => {
                  mainPage
                    ? dispatch(
                        paginationModeActions.setPageSize(event.target.value)
                      )
                    : dispatch(
                        paginationModeActions.setFavoritesPageSize(
                          event.target.value
                        )
                      );
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      )}
      <Chip
        icon={<SportsEsportsIcon />}
        label={`Games: ${gamesList.length}`}
        color={gamesList.length > 0 ? 'success' : 'error'}
        variant='outlined'
      />
    </Box>
  );
};

export default PaginationControl;
