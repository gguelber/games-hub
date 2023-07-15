import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';
import FullGameCard from './FullGameCard';

const FullGameCardModal = ({ open, handleClose, clickedGame }) => {
  return (
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
  );
};

export default FullGameCardModal;
