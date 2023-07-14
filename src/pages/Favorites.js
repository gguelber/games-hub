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
  Rating,
  Select,
  Snackbar,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { useQueryGames } from '../services/gamesServices';
import { gameFilterActions } from '../store/gameFilter';
import GameCard from '../components/GameCard';
import FullGameCard from '../components/FullGameCard';
import Filter from '../components/Filter';
import ScrollToTop from '../components/ScrollToTop';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';

import { handleSnackbar } from '../utils/snackBar';
import { useNavigate } from 'react-router-dom';

const formStyle = {
  m: 2,
  mb: 4,
};

const Favorites = () => {
  // Fetch the games from the API using SWR and stores on the 'game' variable. If there's an error, store it on the 'error' variable.
  // Set the conditions for revalidation and retry to false
  const {
    data: games,
    error,
    isValidating,
  } = useQueryGames({
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  // State to handle the card opening
  const [open, setOpen] = useState(false);
  // State to handle the snackbar to display the message
  const [openSnackBar, setOpenSnackbar] = useState(false);
  // State to store the message
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // State to define the color (severity) of the message
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  // Variable to dispatch actions to redux-toolkit store
  const dispatch = useDispatch();
  // React-router-dom hook to handle routes navigation
  const navigate = useNavigate();

  // References for the favorites and ratings collections in Firebase
  const favoritesCollectionRef = collection(db, 'favorites');
  const ratingsCollectionRef = collection(db, 'ratings');

  // State to handle the 'ScrollToTop' component
  const scrollPosition = useSelector(
    (state) => state.gameFilter.scrollPosition
  );
  // State to handle the user
  const user = useSelector((state) => state.userData.user);
  // State to handle the drawer component
  const drawerOpener = useSelector((state) => state.gameFilter.drawerOpener);
  // State to handle the selected genre
  const selectedGenre = useSelector((state) => state.gameFilter.genreFilter);
  // State to handle the selected platform
  const selectedPlatform = useSelector(
    (state) => state.gameFilter.platformFilter
  );
  // State to handle the title input value
  const gameTitle = useSelector((state) => state.gameFilter.titleFilter);
  // State to store the clicked game card
  const clickedGame = useSelector((state) => state.gameFilter.clickedGame);
  // State to handle the games list after filtering and sorting
  const gamesList = useSelector((state) => state.gameFilter.gamesList);
  // State to handle the selected sorting method
  const selectedSorting = useSelector(
    (state) => state.gameFilter.sortingFilter
  );
  const selectedRating = useSelector((state) => state.gameFilter.ratingFilter);
  const favoritesList = useSelector((state) => state.gameFilter.favoritesList);
  const ratingsList = useSelector((state) => state.gameFilter.ratingsList);

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
    dispatch(gameFilterActions.setGenreFilter(event.target.value));
  };
  // Function to handle the selected platform that will be used to filter the games list
  const handleSelectedPlatform = (event) => {
    dispatch(gameFilterActions.setPlatformFilter(event.target.value));
  };
  // Function to handle the selected sorting method that will be used to sort the games list
  const handleSelectedSorting = (event) => {
    dispatch(gameFilterActions.setSortingFilter(event.target.value));
  };
  // Function to handle the selected rating method that will be used to filter/sort the games list
  const handleSelectedRating = (event) => {
    dispatch(gameFilterActions.setRatingFilter(event.target.value));
  };
  // Function to handle the button to sort the games list randomly
  const handleShuffle = () => {
    dispatch(gameFilterActions.setSortingFilter('random'));
    handleGamesList(games);
  };
  // Function to handle the game's title input value that will be used to filter the games list
  const handleTitle = (event) => {
    dispatch(gameFilterActions.setTitleFilter(event.target.value));
  };

  // Function to handle all possible errors returned by the API
  const handleError = () => {
    if (error.code === 'ECONNABORTED') {
      // console.log(error);
      handleSnackbar(
        handleCloseSnackbar,
        setSnackbarMessage,
        'O servidor demorou para responder, tente mais tarde.',
        setSnackbarSeverity,
        'error',
        setOpenSnackbar
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
      // console.log(error);
      handleSnackbar(
        handleCloseSnackbar,
        setSnackbarMessage,
        'O servidor falhou em responder, tente recarregar a página.',
        setSnackbarSeverity,
        'error',
        setOpenSnackbar
      );
    } else {
      // console.log(error);
      handleSnackbar(
        handleCloseSnackbar,
        setSnackbarMessage,
        'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.',
        setSnackbarSeverity,
        'error',
        setOpenSnackbar
      );
    }
  };

  // Function to handle the error state and close the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Function to update the games list based on the selected filters and sorting methods
  const handleGamesList = (games) => {
    const tempGamesList = games.data.map((game) => {
      const tempGame = {
        ...game,
        favorite: false,
        rating: null,
        favoriteDocId: null,
        ratingDocId: null,
      };
      if (favoritesList.length) {
        favoritesList.map((favorite) => {
          if (favorite.id === game.id) {
            tempGame.favorite = true;
            tempGame.favoriteDocId = favorite.docId;
          }
        });
      }
      if (ratingsList.length) {
        ratingsList.map((rating) => {
          if (rating.id === game.id) {
            tempGame.rating = rating.rating;
            tempGame.ratingDocId = rating.docId;
          }
        });
      }
      return tempGame;
    });
    const newGamesList = tempGamesList
      .filter((game) => {
        return gameTitle === ''
          ? game
          : game.title.toLowerCase().includes(gameTitle.toLowerCase());
      })
      .filter((game) => {
        return selectedGenre === '' ? game : selectedGenre === game.genre;
      })
      .filter((game) => {
        return selectedPlatform === ''
          ? game
          : selectedPlatform === game.platform;
      })
      .filter((game) => {
        return favoritesList.some((favorite) => favorite.id === game.id);
      })
      .filter((game) => {
        return selectedRating === '' ||
          selectedRating === 'best' ||
          selectedRating === 'worse'
          ? game
          : Number(selectedRating) === game.rating;
      });

    handleSortingMethod(newGamesList);
    handleRatingMethod(newGamesList);
    dispatch(gameFilterActions.setGamesList(newGamesList));
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
  // Function to handle the selected rating method (Best or Worse)
  const handleRatingMethod = (gamesList) => {
    switch (selectedRating) {
      case 'best':
        gamesList.sort((a, b) => {
          const ratingA = a.rating;
          const ratingB = b.rating;

          if (ratingA === null && ratingB !== null) {
            return 1;
          }
          if (ratingA !== null && ratingB === null) {
            return -1;
          }
          if (ratingA !== null && ratingB !== null) {
            if (ratingA > ratingB) {
              return -1;
            }
            if (ratingA < ratingB) {
              return 1;
            }
          }
          return 0;
        });
        break;

      case 'worse':
        gamesList.sort((a, b) => {
          const ratingA = a.rating;
          const ratingB = b.rating;

          if (ratingA === null && ratingB !== null) {
            return 1;
          }
          if (ratingA !== null && ratingB === null) {
            return -1;
          }
          if (ratingA !== null && ratingB !== null) {
            if (ratingA < ratingB) {
              return -1;
            }
            if (ratingA > ratingB) {
              return 1;
            }
          }
          return 0;
        });
        break;

      default:
        break;
    }
  };

  // Function to reset all fields and filter/sorting states
  const handleReset = () => {
    dispatch(gameFilterActions.resetFilter());
  };

  // Cloud Firestore listener for favorites and ratings data, also an unsubscribe function
  useEffect(() => {
    const unsubscribeFavorites = onSnapshot(
      favoritesCollectionRef,
      (snapshot) => {
        const tempTotalFavoritesList = [];
        snapshot.docs.map((doc) => {
          tempTotalFavoritesList.push({
            id: doc.data().id,
          });
        });
        if (user) {
          const tempFavoritesList = [];
          snapshot.docs.map((doc) => {
            if (user.uid === doc.data().userId) {
              tempFavoritesList.push({ ...doc.data(), docId: doc.id });
            }
          });
          dispatch(gameFilterActions.setFavoritesList(tempFavoritesList));
        }
        dispatch(
          gameFilterActions.setTotalFavoritesList(tempTotalFavoritesList)
        );
      },
      (error) => {
        dispatch(gameFilterActions.setFavoritesList([]));
        // console.log(error.message);
      }
    );

    const unsubscribeRatings = onSnapshot(
      ratingsCollectionRef,
      (snapshot) => {
        const tempTotalRatingsList = [];
        snapshot.docs.map((doc) => {
          tempTotalRatingsList.push({
            id: doc.data().id,
            rating: doc.data().rating,
          });
        });
        if (user) {
          const tempRatingsList = [];
          snapshot.docs.map((doc) => {
            if (user.uid === doc.data().userId) {
              tempRatingsList.push({ ...doc.data(), docId: doc.id });
            }
          });
          dispatch(gameFilterActions.setRatingsList(tempRatingsList));
        }
        dispatch(gameFilterActions.setTotalRatingsList(tempTotalRatingsList));
      },
      (error) => {
        dispatch(gameFilterActions.setRatingsList([]));
        // console.log(error.message);
      }
    );

    return () => {
      unsubscribeFavorites();
      unsubscribeRatings();
    };
  }, [user]);

  useEffect(() => {
    error && handleError();
    games && handleGamesList(games);
  }, [
    games,
    favoritesList,
    ratingsList,
    selectedGenre,
    selectedPlatform,
    selectedSorting,
    selectedRating,
    gameTitle,
    error,
  ]);

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 112px)', sm: 'calc(100vh - 128px)' },
      }}
    >
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
            variant='outlined'
            onChange={handleTitle}
            value={gameTitle}
            sx={formStyle}
            size='small'
          />
          <FormControl sx={formStyle} size='small'>
            <InputLabel id='genre-drawer-label'>Genre</InputLabel>
            <Select
              labelId='genre-drawer-label'
              id='genre-drawer'
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
            <InputLabel id='platform-drawer-label'>Platform</InputLabel>
            <Select
              labelId='platform-drawer-label'
              id='platform-drawer'
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
            <InputLabel id='sort-drawer-label'>Sort</InputLabel>
            <Select
              labelId='sort-drawer-label'
              id='sort-drawer'
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
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
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
                lg: '40vw',
                xl: '30vw',
              },
              maxHeight: {
                xs: '85%',
                md: '95%',
              },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 0,
              overflowY: 'auto',
            }}
          >
            <FullGameCard game={clickedGame} />
          </Box>
        </Fade>
      </Modal>
      {user && (
        <>
          <Container sx={{ textAlign: 'center', pt: 4, mb: 3 }}>
            <Typography variant='h6' fontSize={{ xs: 18, sm: 22, lg: 28 }}>
              Favorites
            </Typography>
            <Typography variant='h1' fontSize={{ xs: 12, sm: 14, lg: 18 }}>
              The list of games that changed your life
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
              handleSelectedRating={handleSelectedRating}
              gameTitle={gameTitle}
              selectedGenre={selectedGenre}
              selectedPlatform={selectedPlatform}
              selectedSorting={selectedSorting}
              selectedRating={selectedRating}
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
              label={`Games: ${gamesList.length}`}
              color={gamesList.length > 0 ? 'success' : 'error'}
              variant='outlined'
            />
          </Container>
        </>
      )}
      {!user && !isValidating ? (
        <Container sx={{ pt: 8, textAlign: 'center' }}>
          <Typography variant='h6' fontSize={{ xs: 18, sm: 22, lg: 28 }} mb={5}>
            Login to see your favorites
          </Typography>
          <Button variant='contained' onClick={() => navigate('/auth')}>
            Login
          </Button>
        </Container>
      ) : games ? (
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
              setSnackbar={setOpenSnackbar}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarSeverity={setSnackbarSeverity}
              closeSnackbar={handleCloseSnackbar}
            />
          ))}
        </Grid>
      ) : error ? (
        <Container sx={{ mt: 8, textAlign: 'center' }}>
          <Button variant='contained' onClick={() => window.location.reload()}>
            Reload page
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

export default Favorites;
