import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Fade,
  Grid,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

import '../App.css';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { db } from '../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { animationModeActions } from '../store/animationMode';
import { handleSnackbar } from '../utils/snackBar';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FAAF00',
  },
  '& .MuiRating-iconHover': {
    color: '#f7c551',
  },
});

const GameCard = ({
  game,
  click,
  setSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
  closeSnackbar,
}) => {
  const [ratingValue, setRatingValue] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favClicked, setFavClicked] = useState('');
  const [ratingClicked, setRatingClicked] = useState('');

  const [favCounter, setFavCounter] = useState(0);
  const [ratingCounter, setRatingCounter] = useState(0);
  const [ratingAvg, setRatingAvg] = useState(0);

  const favList = useSelector((state) => state.gameFilter.totalFavoritesList);
  const ratingsList = useSelector((state) => state.gameFilter.totalRatingsList);

  const favoritesCollectionRef = collection(db, 'favorites');
  const ratingsCollectionRef = collection(db, 'ratings');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.user);

  const handleFavIconAnimation = (favMode, badgeMode) => {
    setFavClicked(favMode);
    dispatch(animationModeActions.setBadgeClass(badgeMode));
  };

  const handleRatingAnimation = (ratingMode) => {
    setRatingClicked(ratingMode);
  };

  const handleFavorites = (game) => {
    if (user) {
      if (!isFavorited) {
        setIsFavorited(true);
        handleFavIconAnimation('favAdd', 'badgeAdd');
        addDoc(favoritesCollectionRef, {
          id: game.id,
          userId: user.uid,
        })
          .then(() => {
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `${game.title} added to favorites.`,
              setSnackbarSeverity,
              'success',
              setSnackbar
            );
          })
          .catch((error) => {
            setIsFavorited(false);
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `Error adding ${game.title} to favorites.`,
              setSnackbarSeverity,
              'error',
              setSnackbar
            );
          });
      } else {
        setIsFavorited(false);
        handleFavIconAnimation('favRemove', 'badgeRemove');
        const docRef = doc(db, 'favorites', game.favoriteDocId);
        deleteDoc(docRef)
          .then(() => {
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `${game.title} removed from favorites.`,
              setSnackbarSeverity,
              'success',
              setSnackbar
            );
          })
          .catch((error) => {
            setIsFavorited(true);
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `Error removing ${game.title} from favorites.`,
              setSnackbarSeverity,
              'error',
              setSnackbar
            );
          });
      }
    } else {
      handleSnackbar(
        closeSnackbar,
        setSnackbarMessage,
        'Please login before adding a game to favorites.',
        setSnackbarSeverity,
        'error',
        setSnackbar
      );
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    }
  };

  const handleRatings = (event, newValue, game) => {
    const oldRating = ratingValue;
    if (user) {
      if (!ratingValue) {
        setRatingValue(newValue);
        handleRatingAnimation('ratingAdd');
        addDoc(ratingsCollectionRef, {
          id: game.id,
          userId: user.uid,
          rating: newValue,
        })
          .then((response) => {
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `${game.title} rated with ${newValue} ${
                newValue > 1 ? 'stars' : 'star'
              }.`,
              setSnackbarSeverity,
              'success',
              setSnackbar
            );
          })
          .catch((error) => {
            setRatingValue(oldRating);
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `Error rating ${game.title}.`,
              setSnackbarSeverity,
              'error',
              setSnackbar
            );
          });
      } else if (newValue === null) {
        setRatingValue(newValue);
        handleRatingAnimation('ratingRemove');
        const docRef = doc(db, 'ratings', game.ratingDocId);
        deleteDoc(docRef)
          .then(() => {
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `The rating for ${game.title} was removed.`,
              setSnackbarSeverity,
              'success',
              setSnackbar
            );
          })
          .catch((error) => {
            setRatingValue(true);
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `Error removing rating for ${game.title}.`,
              setSnackbarSeverity,
              'error',
              setSnackbar
            );
          });
      } else {
        setRatingValue(newValue);
        handleRatingAnimation('ratingUpdate');
        const docRef = doc(db, 'ratings', game.ratingDocId);
        updateDoc(docRef, {
          rating: newValue,
        })
          .then(() => {
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `The rating for ${game.title} was updated to ${newValue} ${
                newValue > 1 ? 'stars' : 'star'
              }.`,
              setSnackbarSeverity,
              'success',
              setSnackbar
            );
          })
          .catch((error) => {
            setRatingValue(true);
            handleSnackbar(
              closeSnackbar,
              setSnackbarMessage,
              `Error updating rating for ${game.title}.`,
              setSnackbarSeverity,
              'error',
              setSnackbar
            );
          });
      }
    } else {
      handleSnackbar(
        closeSnackbar,
        setSnackbarMessage,
        `Please login before rating a game.`,
        setSnackbarSeverity,
        'error',
        setSnackbar
      );

      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    }
  };

  useEffect(() => {
    let tempFavCounter = 0;
    let tempRatingCounter = 0;
    let tempRatingValue = 0;
    favList.map((fav) => {
      fav.id === game.id && tempFavCounter++;
    });
    ratingsList.map((rating) => {
      if (rating.id === game.id) {
        tempRatingCounter++;
        tempRatingValue += rating.rating;
      }
    });
    setFavCounter(tempFavCounter);
    setRatingCounter(tempRatingCounter);
    setRatingAvg(tempRatingValue / tempRatingCounter || 0);
  }, [favList, ratingsList]);

  useEffect(() => {
    if (favClicked) {
      setTimeout(() => {
        setFavClicked('');
        dispatch(animationModeActions.setBadgeClass(''));
      }, 2500);
    }
    if (ratingClicked) {
      setTimeout(() => {
        setRatingClicked('');
      }, 2500);
    }
  }, [favClicked, ratingClicked]);

  useEffect(() => {
    game.favorite ? setIsFavorited(true) : setIsFavorited(false);
    game.rating ? setRatingValue(game.rating) : setRatingValue(0);
  }, [game.favorite, game.rating]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box className='gameCard'>
        <Paper
          elevation={3}
          bgcolor={'background.default'}
          color={'text.primary'}
          sx={{ maxWidth: { md: 500 } }}
        >
          <Card>
            <CardActionArea onClick={click}>
              <CardHeader
                title={game.title}
                subheader={game.genre}
                titleTypographyProps={{
                  fontSize: {
                    xs: 18,
                    sm: 22,
                    md: 20,
                    lg: 20,
                    xl: 25,
                  },
                  textAlign: 'center',
                }}
                subheaderTypographyProps={{
                  fontSize: {
                    xs: 12,
                    sm: 13,
                    md: 13,
                    lg: 13,
                    xl: 16,
                  },
                  textAlign: 'center',
                }}
              />
              <CardMedia
                component='img'
                image={game.thumbnail}
                loading='lazy'
                alt={game.short_description}
                // sx={{ width: '95%', m: 'auto', borderRadius: 1 }}
              />
              <CardContent>
                <Box>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: { xs: 2, xl: 1 },
                    }}
                  >
                    {game.short_description}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <Box display='flex' alignItems='center' gap={0.5}>
                <Tooltip
                  title={
                    user
                      ? ratingValue
                        ? 'Your rating'
                        : 'Rate this game!'
                      : 'Login to rate this game!'
                  }
                  arrow
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  enterDelay={200}
                >
                  <StyledRating
                    name={`simple-controlled-${game.id}`}
                    value={ratingValue}
                    className={ratingClicked}
                    max={4}
                    onChange={(event, newValue) =>
                      handleRatings(event, newValue, game)
                    }
                    size='small'
                    sx={{ ml: 1 }}
                  />
                </Tooltip>
                {ratingAvg > 0 && (
                  <Tooltip
                    title='Average rating'
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    enterDelay={200}
                  >
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ opacity: 0.7, mt: 0.3 }}
                      className={ratingClicked}
                    >
                      {ratingAvg.toFixed(1)}
                    </Typography>
                  </Tooltip>
                )}
                {ratingCounter > 0 && (
                  <Tooltip
                    title='Total users'
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    enterDelay={200}
                  >
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ opacity: 0.7, mt: 0.3 }}
                      className={ratingClicked}
                    >
                      ({ratingCounter})
                    </Typography>
                  </Tooltip>
                )}
              </Box>
              <IconButton
                aria-label='favorite-button'
                color='primary'
                sx={{
                  mr: 1,
                  '&:hover': { bgcolor: 'rgba(249, 24, 128, 0.1)' },
                  p: 2,
                }}
                onClick={() => handleFavorites(game)}
              >
                <FavoriteIcon
                  className={favClicked}
                  sx={{
                    color: isFavorited ? '#f44336' : '#5f5f72',
                    position: 'absolute',
                  }}
                />
              </IconButton>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    </Grid>
  );
};

export default GameCard;
