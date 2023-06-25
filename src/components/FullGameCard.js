import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Link,
  Paper,
  Typography,
} from '@mui/material';

const FullGameCard = ({ game }) => {
  return (
    <Paper
      elevation={3}
      bgcolor={'background.default'}
      color={'text.primary'}
    >
      <Card>
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
          alt='Paella dish'
        />
        <CardContent>
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
          >
            {game.short_description}
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
          >
            <span style={{ fontWeight: 'bold' }}>
              Platform:{' '}
            </span>
            {game.platform}
          </Typography>
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
          >
            <span style={{ fontWeight: 'bold' }}>
              Developer:{' '}
            </span>

            {game.developer}
          </Typography>
          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
          >
            <span style={{ fontWeight: 'bold' }}>
              Publisher:{' '}
            </span>

            {game.publisher}
          </Typography>

          <Typography
            paragraph
            variant='body2'
            color='text.secondary'
          >
            <span style={{ fontWeight: 'bold' }}>
              Release date:{' '}
            </span>
            {game.release_date}
          </Typography>
          <Typography paragraph>
            <Link
              href={game.freetogame_profile_url}
              underline='hover'
              target='_blank'
              rel='noreferrer'
              aria-label={`For more information, visit the ${game.title} website in a new window`}
            >{`Freetogame review`}</Link>
          </Typography>
          <Typography>
            <Link
              href={game.game_url}
              underline='hover'
              target='_blank'
              rel='noreferrer'
              aria-label={`For more information, visit the ${game.title} website in a new window`}
            >{`${game.title} website`}</Link>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default FullGameCard;
