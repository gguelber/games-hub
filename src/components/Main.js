import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Alert,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { useQueryGames } from '../services/gamesServices';
import { gameFilterActions } from '../store/gameFilter';
import GameCard from './GameCard';
import FullGameCard from './FullGameCard';
import Filter from './Filter';
import ScrollToTop from './ScrollToTop';

const formStyle = {
  m: 2,
  mb: 4,
};

const Main = () => {
  // Fetch the games from the API using SWR and stores on the 'game' variable. If there's an error, store it on the 'error' variable.
  // Set the conditions for revalidation and retry to false
  const { data: games, error } = useQueryGames({
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  // State to handle the card opening
  const [open, setOpen] = useState(false);
  // State to handle the snackbar to display the error message
  const [openError, setOpenError] = useState(false);
  // State to store the error message, if there's an error
  const [errorMessage, setErrorMessage] = useState('');

  // Variable to dispatch actions to redux-toolkit store
  const dispatch = useDispatch();

  // State to handle the 'ScrollToTop' component
  const scrollPosition = useSelector(
    (state) => state.gameFilter.scrollPosition
  );

  // State to handle the drawer component
  const drawerOpener = useSelector(
    (state) => state.gameFilter.drawerOpener
  );
  // State to handle the selected genre
  const selectedGenre = useSelector(
    (state) => state.gameFilter.genreFilter
  );
  // State to handle the selected platform
  const selectedPlatform = useSelector(
    (state) => state.gameFilter.platformFilter
  );
  // State to handle the title input value
  const gameTitle = useSelector(
    (state) => state.gameFilter.titleFilter
  );
  // State to store the clicked game card
  const clickedGame = useSelector(
    (state) => state.gameFilter.clickedGame
  );
  // State to handle the games list after filtering and sorting
  const gamesList = useSelector(
    (state) => state.gameFilter.gamesList
  );
  // State to handle the selected sorting method
  const selectedSorting = useSelector(
    (state) => state.gameFilter.sortingFilter
  );

  // Function to open the game card modal
  const handleOpen = (game) => {
    dispatch(gameFilterActions.setClickedGame(game));
    setOpen(true);
  };

  // Function to handle the modal closing
  const handleClose = () => setOpen(false);

  // Function to create an array of unique genres
  const handleGenres = (games) => {
    let genreSet = new Set();
    let genresArray = [];
    games.map((game) => {
      genreSet.add(game.genre);
    });

    genresArray = [...genreSet];
    return genresArray.map((genre) => {
      return (
        <MenuItem value={genre} key={genre}>
          {genre}
        </MenuItem>
      );
    });
  };
  // Function to create an array of unique platforms
  const handlePlatforms = (games) => {
    let platformSet = new Set();
    let platformsArray = [];
    games &&
      games.map((game) => {
        platformSet.add(game.platform);
      });

    platformsArray = [...platformSet];
    return platformsArray?.map((platform) => {
      return (
        <MenuItem value={platform} key={platform}>
          {platform}
        </MenuItem>
      );
    });
  };

  // Function to handle the selected genre that will be used to filter the games list
  const handleSelectedGenre = (event) => {
    dispatch(
      gameFilterActions.setGenreFilter(event.target.value)
    );
  };
  // Function to handle the selected platform that will be used to filter the games list
  const handleSelectedPlatform = (event) => {
    dispatch(
      gameFilterActions.setPlatformFilter(event.target.value)
    );
  };
  // Function to handle the selected sorting method that will be used to sort the games list
  const handleSelectedSorting = (event) => {
    dispatch(
      gameFilterActions.setSortingFilter(event.target.value)
    );
  };
  // Function to handle the button to sort the games list randomly
  const handleShuffle = () => {
    dispatch(gameFilterActions.setSortingFilter('random'));
    handleGamesList(games);
  };
  // Function to handle the game's title input value that will be used to filter the games list
  const handleTitle = (event) => {
    dispatch(
      gameFilterActions.setTitleFilter(event.target.value)
    );
  };

  // Function to handle all possible errors returned by the API
  const handleError = () => {
    if (error.code === 'ECONNABORTED') {
      console.log(error);
      setOpenError(true);
      setErrorMessage(
        'O servidor demorou para responder, tente mais tarde.'
      );
    } else if (
      error.response.status === 509 ||
      error.response.status === 508 ||
      error.response.status === 507 ||
      error.response.status === 504 ||
      error.response.status === 503 ||
      error.response.status === 502 ||
      error.response.status === 500
    ) {
      console.log(error);
      setOpenError(true);
      setErrorMessage(
        'O servidor falhou em responder, tente recarregar a página.'
      );
    } else {
      console.log(error);
      setOpenError(true);
      setErrorMessage(
        'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.'
      );
    }
  };

  // Function to handle the error state and close the snackbar
  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage('');
  };

  // Function to update the games list based on the selected filters andsorting methods
  const handleGamesList = (games) => {
    const tempGamesList = games.data
      .filter((game) => {
        return gameTitle === ''
          ? game
          : game.title
              .toLowerCase()
              .includes(gameTitle.toLowerCase());
      })
      .filter((game) => {
        return selectedGenre === ''
          ? game
          : selectedGenre === game.genre;
      })
      .filter((game) => {
        return selectedPlatform === ''
          ? game
          : selectedPlatform === game.platform;
      });

    handleSortingMethod(tempGamesList);
    dispatch(gameFilterActions.setGamesList(tempGamesList));
  };

  // Function to handle the selected sorting method
  const handleSortingMethod = (gamesList) => {
    switch (selectedSorting) {
      case 'ascending':
        gamesList.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
        break;
      case 'descending':
        gamesList.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA > titleB) {
            return -1;
          }
          if (titleA < titleB) {
            return 1;
          }
          return 0;
        });
        break;
      case 'random':
        gamesList.sort(() => Math.random() - 0.5);
        break;

      default:
        break;
    }
  };

  // Function to reset all fields and filter/sorting states
  const handleReset = () => {
    dispatch(gameFilterActions.resetFilter());
  };

  // Function to handle the scrolling position and update the correct state
  const handleScrollPosition = () => {
    window.scrollY === 0
      ? dispatch(gameFilterActions.setScrollPosition(0))
      : dispatch(gameFilterActions.setScrollPosition(1));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener(
        'scroll',
        handleScrollPosition
      );
    };
  }, []);

  useEffect(() => {
    error && handleError();
    games && handleGamesList(games);
  }, [
    games,
    selectedGenre,
    selectedPlatform,
    selectedSorting,
    gameTitle,
    error,
  ]);

  return (
    <Box>
      <SwipeableDrawer
        anchor={'left'}
        open={drawerOpener}
        onOpen={() =>
          dispatch(gameFilterActions.setDrawerOpener())
        }
        onClose={() =>
          dispatch(gameFilterActions.setDrawerOpener())
        }
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
            variant='outlined'
            onChange={handleTitle}
            value={gameTitle}
            sx={formStyle}
            size='small'
          />
          <FormControl sx={formStyle} size='small'>
            <InputLabel id='genre-helper-label'>
              Genre
            </InputLabel>
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
            <InputLabel id='genre-helper-label'>
              Platform
            </InputLabel>
            <Select
              labelId='genre-helper-label'
              id='genre-helper'
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
            <InputLabel id='genre-helper-label'>
              Sort
            </InputLabel>
            <Select
              labelId='genre-helper-label'
              id='genre-helper'
              value={
                selectedSorting !== 'random'
                  ? selectedSorting
                  : ''
              }
              autoWidth
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
            color='inherit'
            onClick={handleShuffle}
            sx={{ m: 2 }}
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
        </Box>
      </SwipeableDrawer>
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleCloseError}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleCloseError}
          severity='error'
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '80vw',
                sm: '70vw',
                md: '60vw',
                lg: '60vw',
                xl: '50vw',
              },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 0,
            }}
          >
            <FullGameCard game={clickedGame} />
          </Box>
        </Fade>
      </Modal>
      <Container sx={{ textAlign: 'center', mt: 4, mb: 3 }}>
        <Typography
          variant='h6'
          fontSize={{ xs: 18, sm: 22, lg: 28 }}
        >
          Welcome to the Gamer Hub
        </Typography>
        <Typography
          variant='h1'
          fontSize={{ xs: 12, sm: 14, lg: 18 }}
        >
          A collection of the best games of all times
        </Typography>
      </Container>
      <Container
        sx={{
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
        }}
      >
        <Filter
          games={games}
          handleTitle={handleTitle}
          handleSelectedGenre={handleSelectedGenre}
          handleSelectedPlatform={handleSelectedPlatform}
          handlePlatforms={handlePlatforms}
          handleGenres={handleGenres}
          handleShuffle={handleShuffle}
          handleReset={handleReset}
          handleSelectedSorting={handleSelectedSorting}
          gameTitle={gameTitle}
          selectedGenre={selectedGenre}
          selectedPlatform={selectedPlatform}
          selectedSorting={selectedSorting}
        />
      </Container>
      <Divider />
      <Container
        sx={{
          mt: { xs: 2, sm: 4, md: 6, lg: 6, xl: 6 },
          textAlign: 'center',
        }}
      >
        <Chip
          icon={<SportsEsportsIcon />}
          label={`Results: ${gamesList.length}`}
          color={gamesList.length > 0 ? 'success' : 'error'}
          variant='outlined'
        />
      </Container>
      {games ? (
        <Grid
          container
          columnSpacing={10}
          rowSpacing={{ xs: 4, sm: 6, md: 4 }}
          padding={{ xs: 5, sm: 8, md: 8, lg: 10, xl: 14 }}
        >
          <ScrollToTop scrollPosition={scrollPosition} />
          {gamesList.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              click={() => handleOpen(game)}
            />
          ))}
        </Grid>
      ) : error ? (
        <Container sx={{ mt: 8, textAlign: 'center' }}>
          <Button
            variant='contained'
            onClick={() => window.location.reload()}
          >
            Refresh page
          </Button>
        </Container>
      ) : (
        <Container sx={{ mt: 10, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      )}
    </Box>
  );
};

export default Main;
