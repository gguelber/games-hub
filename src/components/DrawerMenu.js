import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { gameFilterActions } from '../store/gameFilter';
import { useDispatch } from 'react-redux';

const formStyle = {
  m: 2,
  mb: 4,
};

const DrawerMenu = ({
  drawerOpener,
  handleTitle,
  gameTitle,
  selectedGenre,
  handleSelectedGenre,
  handleGenres,
  selectedPlatform,
  handleSelectedPlatform,
  handlePlatforms,
  selectedSorting,
  handleSelectedSorting,
  selectedRating,
  handleSelectedRating,
  handleShuffle,
  handleReset,
  games,
}) => {
  const dispatch = useDispatch();

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={drawerOpener}
      onOpen={() => dispatch(gameFilterActions.setDrawerOpener())}
      onClose={() => dispatch(gameFilterActions.setDrawerOpener())}
    >
      <Box
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 250,
          mt: 6,
        }}
      >
        <Typography
          variant='h5'
          sx={{
            fontSize: 25,
            mb: 4,
          }}
          textAlign='center'
        >
          Filters
        </Typography>
        <TextField
          id='outlined-basic'
          label='Search by title'
          onChange={handleTitle}
          value={gameTitle}
          sx={formStyle}
          size='small'
        />
        <FormControl sx={formStyle} size='small'>
          <InputLabel id='genre-helper-label'>Genre</InputLabel>
          <Select
            labelId='genre-helper-label'
            id='genre-helper'
            value={selectedGenre}
            label='Genre'
            onChange={handleSelectedGenre}
            autoWidth
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {games && handleGenres(games.data)}
          </Select>
        </FormControl>
        <FormControl sx={formStyle} size='small'>
          <InputLabel id='platform-helper-label'>Platform</InputLabel>
          <Select
            labelId='platform-helper-label'
            id='platform-helper'
            value={selectedPlatform}
            label='Platform'
            onChange={handleSelectedPlatform}
            autoWidth
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {games && handlePlatforms(games.data)}
          </Select>
        </FormControl>
        <FormControl sx={formStyle} size='small'>
          <InputLabel id='sort-helper-label'>Sort</InputLabel>
          <Select
            labelId='sort-helper-label'
            id='sort-helper'
            value={selectedSorting !== 'random' ? selectedSorting : ''}
            autoWidth
            label='Sort'
            onChange={handleSelectedSorting}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='ascending'>Ascending</MenuItem>
            <MenuItem value='descending'>Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={formStyle} size='small'>
          <InputLabel id='rating-helper-label'>Rating</InputLabel>
          <Select
            labelId='rating-helper-label'
            id='rating-helper'
            value={selectedRating}
            autoWidth
            label='Rating'
            onChange={handleSelectedRating}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='best'>Best</MenuItem>
            <MenuItem value='worse'>Worse</MenuItem>
            <MenuItem value='1'>
              <Rating
                name='read-only'
                max={4}
                value={1}
                readOnly
                size='small'
              />
            </MenuItem>
            <MenuItem value='2'>
              <Rating
                name='read-only'
                max={4}
                value={2}
                readOnly
                size='small'
              />
            </MenuItem>
            <MenuItem value='3'>
              <Rating
                name='read-only'
                max={4}
                value={3}
                readOnly
                size='small'
              />
            </MenuItem>
            <MenuItem value='4'>
              <Rating
                name='read-only'
                max={4}
                value={4}
                readOnly
                size='small'
              />
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          color='inherit'
          onClick={handleShuffle}
          sx={{ m: 2 }}
        >
          Shuffle
        </Button>
        {(selectedGenre ||
          selectedPlatform ||
          selectedSorting ||
          selectedRating ||
          gameTitle) && (
          <Chip
            sx={{
              ml: { md: 2 },
              mt: { xs: 2, md: 0 },
              width: 'fit-content',
              alignSelf: 'center',
            }}
            label='Reset'
            onDelete={handleReset}
          />
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default DrawerMenu;
