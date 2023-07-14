import React from 'react';
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const Filter = ({
  games,
  handleTitle,
  handleSelectedGenre,
  handleSelectedPlatform,
  handleSelectedSorting,
  handleSelectedRating,
  handlePlatforms,
  handleGenres,
  handleShuffle,
  handleReset,
  gameTitle,
  selectedGenre,
  selectedPlatform,
  selectedSorting,
  selectedRating,
}) => {
  return (
    <Paper
      elevation={3}
      bgcolor={'background.default'}
      color={'text.primary'}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: { md: 'center' },
        p: 2,
        m: 4,
        width: 'fit-content',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
          },
          mb: { xs: 2, md: 0 },
          mr: { md: 2 },
        }}
      >
        Filters:
      </Typography>
      <TextField
        id='search-title'
        label='Search by title'
        variant='outlined'
        onChange={handleTitle}
        value={gameTitle}
        sx={{
          mb: { xs: 1, md: 0 },
          mr: { md: 2 },
          maxWidth: 220,
          width: { md: 220 },
        }}
        size='small'
      />

      <FormControl
        sx={{
          m: 0,
          mb: { xs: 1, md: 0 },
          mr: { md: 2 },
          maxWidth: { xs: 220, md: 110 },
          width: { md: 110 },
        }}
        size='small'
        id='genre-form-field'
      >
        <InputLabel id='genre-filter-label'>Genre</InputLabel>
        <Select
          labelId='genre-filter-label'
          id='genre-filter'
          value={selectedGenre}
          label='Genre'
          onChange={handleSelectedGenre}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {games && handleGenres(games.data)}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          m: 0,
          mr: { md: 2 },
          mb: { xs: 1, md: 0 },
          maxWidth: { xs: 220, md: 240 },
          width: { md: 240 },
        }}
        size='small'
        id='platform-form-field'
      >
        <InputLabel id='platform-filter-label'>Platform</InputLabel>
        <Select
          labelId='platform-filter-label'
          id='platform-filter'
          value={selectedPlatform}
          label='Platform'
          onChange={handleSelectedPlatform}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {games && handlePlatforms(games.data)}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          m: 0,
          mr: { md: 2 },
          mb: { xs: 1, md: 0 },
          maxWidth: { xs: 220, md: 130 },
          width: { md: 130 },
        }}
        size='small'
        id='sort-form-field'
      >
        <InputLabel id='sort-filter-label'>Sort</InputLabel>
        <Select
          labelId='sort-filter-label'
          id='sort-filter'
          value={selectedSorting !== 'random' ? selectedSorting : ''}
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
      <FormControl
        sx={{
          m: 0,
          mr: { md: 2 },
          mb: { xs: 1, md: 0 },
          maxWidth: { xs: 220, md: 136 },
          width: { md: 136 },
        }}
        size='small'
        id='rating-form-field'
      >
        <InputLabel id='rating-filter-label'>Rating</InputLabel>
        <Select
          labelId='rating-filter-label'
          id='rating-filter'
          value={selectedRating}
          label='Rating'
          onChange={handleSelectedRating}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='best'>Best</MenuItem>
          <MenuItem value='worse'>Worse</MenuItem>
          <MenuItem value='1'>
            <Rating name='read-only' value={1} readOnly size='small' />
          </MenuItem>
          <MenuItem value='2'>
            <Rating name='read-only' value={2} readOnly size='small' />
          </MenuItem>
          <MenuItem value='3'>
            <Rating name='read-only' value={3} readOnly size='small' />
          </MenuItem>
          <MenuItem value='4'>
            <Rating name='read-only' value={4} readOnly size='small' />
          </MenuItem>
          <MenuItem value='5'>
            <Rating name='read-only' value={5} readOnly size='small' />
          </MenuItem>
        </Select>
      </FormControl>
      <Button variant='contained' onClick={handleShuffle} color={'inherit'}>
        Shuffle
      </Button>
      {(selectedGenre || selectedPlatform || selectedSorting || gameTitle) && (
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
    </Paper>
  );
};

export default Filter;
