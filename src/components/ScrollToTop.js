import React from 'react';

import { Fab, Tooltip, Zoom, useScrollTrigger } from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = ({ scrollPosition }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  return (
    <Zoom in={trigger}>
      <Tooltip title='Scroll to top'>
        <Fab
          color='primary'
          aria-label='add'
          size='small'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: { xs: 5, sm: 10, lg: 20, xl: 30 },
            color: '#686868',
            opacity: 0.6,
            backgroundColor: '#c9c9c9',
            '&:hover': { backgroundColor: '#a8a8a8' },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTop;
