import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  MenuItem,
} from '@mui/material';

import { useQueryGames } from '../services/gamesServices';
import { gameFilterActions } from '../store/gameFilter';
import GameCard from '../components/GameCard';
import Filter from '../components/Filter';
import ScrollToTop from '../components/ScrollToTop';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { handleSnackbar } from '../utils/snackBar';
import PaginationComponent from '../components/PaginationComponent';
import PaginationControl from '../components/PaginationControl';
import PageDescription from '../components/PageDescription';
import FullGameCardModal from '../components/FullGameCardModal';
import SnackbarComponent from '../components/SnackbarComponent';
import DrawerMenu from '../components/DrawerMenu';
import { paginationModeActions } from '../store/paginationMode';

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
  // State to handle the snackbar to display the message
  const [openSnackBar, setOpenSnackbar] = useState(false);
  // State to store the message
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // State to define the color (severity) of the message
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  // Variable to dispatch actions to redux-toolkit store
  const dispatch = useDispatch();

  const favoritesCollectionRef = collection(db, 'favorites');
  const ratingsCollectionRef = collection(db, 'ratings');

  const { isPaginationActive, pageSize, currentPage, prePaginatedListLength } =
    useSelector((state) => state.paginationMode);

  // States from the gamesFilter slice
  const {
    drawerOpener,
    selectedGenre,
    selectedPlatform,
    gameTitle,
    clickedGame,
    gamesList,
    selectedSorting,
    selectedRating,
    favoritesList,
    ratingsList,
    scrollPosition,
  } = useSelector((state) => state.gameFilter);

  // State to handle the user
  const user = useSelector((state) => state.userData.user);

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
        favoritesList.find((favorite) => {
          if (favorite.id === game.id) {
            tempGame.favorite = true;
            tempGame.favoriteDocId = favorite.docId;
          }
        });
      }
      if (ratingsList.length) {
        ratingsList.find((rating) => {
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
        return selectedRating === '' ||
          selectedRating === 'best' ||
          selectedRating === 'worse'
          ? game
          : Number(selectedRating) === game.rating;
      });

    handleSortingMethod(newGamesList);
    handleRatingMethod(newGamesList);

    if (isPaginationActive) {
      const startIdx = (currentPage - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      newGamesList.length <= pageSize * (currentPage - 1) &&
        dispatch(paginationModeActions.setCurrentPage(1));
      dispatch(
        paginationModeActions.setPrePaginatedListLength(newGamesList.length)
      );
      const paginatedItems = newGamesList.slice(startIdx, endIdx);

      dispatch(gameFilterActions.setGamesList(paginatedItems));
    } else {
      dispatch(gameFilterActions.setGamesList(newGamesList));
    }
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
    currentPage,
    isPaginationActive,
    pageSize,
  ]);

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 112px)', sm: 'calc(100vh - 128px)' },
      }}
    >
      <DrawerMenu
        drawerOpener={drawerOpener}
        handleTitle={handleTitle}
        gameTitle={gameTitle}
        selectedGenre={selectedGenre}
        selectedPlatform={selectedPlatform}
        selectedSorting={selectedSorting}
        selectedRating={selectedRating}
        handleSelectedGenre={handleSelectedGenre}
        handleSelectedPlatform={handleSelectedPlatform}
        handleSelectedSorting={handleSelectedSorting}
        handleSelectedRating={handleSelectedRating}
        handleGenres={handleGenres}
        handlePlatforms={handlePlatforms}
        handleShuffle={handleShuffle}
        handleReset={handleReset}
        games={games}
      />
      <SnackbarComponent
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
      <FullGameCardModal
        open={open}
        handleClose={handleClose}
        clickedGame={clickedGame}
      />
      <PageDescription
        title='Welcome to the Games Hub'
        subtitle='A collection of the best games of all times'
      />
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
      <Divider />
      <PaginationControl
        isPaginationActive={isPaginationActive}
        pageSize={pageSize}
        games={games}
        gamesList={gamesList}
        mainPage={true}
      />
      {games ? (
        <Grid
          container
          columnSpacing={10}
          rowSpacing={{ xs: 4, sm: 6, md: 4 }}
          padding={{ xs: 5, sm: 8, md: 8, lg: 10, xl: 8 }}
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
            Refresh page
          </Button>
        </Container>
      ) : (
        <Container sx={{ mt: 10, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      )}
      {games && isPaginationActive && !!gamesList.length && (
        <PaginationComponent
          prePaginatedListLength={prePaginatedListLength}
          pageSize={pageSize}
          currentPage={currentPage}
          mainPage={true}
        />
      )}
    </Box>
  );
};

export default Main;
