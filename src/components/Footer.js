import { Box, Typography } from '@mui/material';
import React from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Footer = () => {
  return (
    <Box
      width='100%'
      sx={{
        height: { xs: 56, sm: 64 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      component='footer'
    >
      <SportsEsportsIcon
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#1976D2' : 'white',
          p: 1,
          fontSize: 20,
        }}
      />
      <Typography
        variant='body1'
        textAlign='center'
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#1976D2' : 'white',
          fontSize: 12,
        }}
      >
        Developed by Gustavo Guelber
      </Typography>
    </Box>
  );
};

export default Footer;
