import React from 'react';
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
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
  handlePlatforms,
  handleGenres,
  handleShuffle,
  handleReset,
  gameTitle,
  selectedGenre,
  selectedPlatform,
  selectedSorting,
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
        id='outlined-basic'
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
      >
        <InputLabel id='genre-helper-label'>Genre</InputLabel>
        <Select
          labelId='genre-helper-label'
          id='genre-helper'
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
      >
        <InputLabel id='genre-helper-label'>
          Platform
        </InputLabel>
        <Select
          labelId='genre-helper-label'
          id='genre-helper'
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
      >
        <InputLabel id='genre-helper-label'>Sort</InputLabel>
        <Select
          labelId='genre-helper-label'
          id='genre-helper'
          value={
            selectedSorting !== 'random' ? selectedSorting : ''
          }
          label='Platform'
          onChange={handleSelectedSorting}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='ascending'>Ascending</MenuItem>
          <MenuItem value='descending'>Descending</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        onClick={handleShuffle}
        color={'inherit'}
      >
        Shuffle
      </Button>
      {(selectedGenre ||
        selectedPlatform ||
        selectedSorting ||
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
    </Paper>
  );
};

export default Filter;
