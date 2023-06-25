import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const GameCard = ({ game, click }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        elevation={3}
        bgcolor={'background.default'}
        color={'text.primary'}
        sx={{ maxWidth: { md: 500 } }}
      >
        <Card onClick={(e) => click()}>
          <CardActionArea>
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
                variant='body2'
                color='text.secondary'
              >
                {game.short_description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Grid>
  );
};

export default GameCard;
