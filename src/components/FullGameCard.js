import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Link,
  Paper,
  Rating,
  Typography,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';

const typographyStyle = { xs: 11, sm: 12, md: 13, lg: 14 };

const FullGameCard = ({ game }) => {
  const [favCounter, setFavCounter] = useState(0);
  const [ratingCounter, setRatingCounter] = useState(0);
  const [ratingAvg, setRatingAvg] = useState(0);

  const favList = useSelector((state) => state.gameFilter.totalFavoritesList);
  const ratingsList = useSelector((state) => state.gameFilter.totalRatingsList);

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

  return (
    <Paper elevation={3} bgcolor={'background.default'} color={'text.primary'}>
      <Card>
        <CardHeader
          title={game.title}
          subheader={game.genre}
          titleTypographyProps={{
            fontSize: {
              xs: 14,
              sm: 22,
              md: 20,
              lg: 20,
              xl: 25,
            },
            textAlign: 'center',
          }}
          subheaderTypographyProps={{
            fontSize: {
              xs: 10,
              sm: 13,
              md: 13,
              lg: 13,
              xl: 16,
            },
            textAlign: 'center',
          }}
        />
        <CardMedia component='img' image={game.thumbnail} alt='Paella dish' />
        <CardContent>
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
            fontSize={typographyStyle}
          >
            {game.short_description}
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
            fontSize={typographyStyle}
          >
            <span style={{ fontWeight: 'bold' }}>Platform: </span>
            {game.platform}
          </Typography>
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
            fontSize={typographyStyle}
          >
            <span style={{ fontWeight: 'bold' }}>Developer: </span>

            {game.developer}
          </Typography>
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
            fontSize={typographyStyle}
          >
            <span style={{ fontWeight: 'bold' }}>Publisher: </span>

            {game.publisher}
          </Typography>

          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
            fontSize={typographyStyle}
          >
            <span style={{ fontWeight: 'bold' }}>Release date: </span>
            {new Date(game.release_date).toLocaleDateString()}
          </Typography>
          <Typography paragraph fontSize={typographyStyle}>
            <Link
              href={game.freetogame_profile_url}
              underline='hover'
              target='_blank'
              rel='noreferrer'
              aria-label={`For more information, visit the ${game.title} website in a new window`}
            >
              Freetogame review
            </Link>
          </Typography>
          <Typography paragraph fontSize={typographyStyle}>
            <Link
              href={game.game_url}
              underline='hover'
              target='_blank'
              rel='noreferrer'
              aria-label={`For more information, visit the ${game.title} website in a new window`}
            >{`${game.title} website`}</Link>
          </Typography>
          {ratingCounter > 0 ? (
            <Box display='flex' gap={1}>
              <Typography
                paragraph
                variant='body2'
                color='text.secondary'
                fontSize={typographyStyle}
              >
                Average rating:
              </Typography>
              <Rating
                value={Number(ratingAvg.toFixed(1))}
                max={4}
                precision={0.1}
                readOnly
                size='small'
              />
              <Typography
                paragraph
                variant='body2'
                color='text.secondary'
                fontSize={typographyStyle}
              >
                {ratingAvg.toFixed(1)}
              </Typography>
              <Typography
                paragraph
                variant='body2'
                color='text.secondary'
                fontSize={typographyStyle}
              >
                {ratingCounter}
              </Typography>
            </Box>
          ) : (
            <Box display='flex' gap={1}>
              <Typography
                paragraph
                variant='body2'
                color='text.secondary'
                fontSize={typographyStyle}
              >
                No user rated this game.
              </Typography>
            </Box>
          )}
          {favCounter > 0 ? (
            <Box display='flex' gap={1} alignItems='center'>
              <Typography
                variant='body2'
                color='text.secondary'
                fontSize={typographyStyle}
              >
                Total favorites for this game:
              </Typography>
              <Badge
                badgeContent={favCounter}
                color='secondary'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <FavoriteIcon color='error' fontSize='medium' />
              </Badge>
            </Box>
          ) : (
            <Box display='flex' alignItems='center'>
              <Typography
                variant='body2'
                color='text.secondary'
                fontSize={typographyStyle}
              >
                No user favorited this game.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};

export default FullGameCard;
