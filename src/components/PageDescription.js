import { Container, Typography } from '@mui/material';
import React from 'react';

const PageDescription = ({ title, subtitle }) => {
  return (
    <Container sx={{ textAlign: 'center', pt: 4, mb: 3 }}>
      <Typography variant='h6' fontSize={{ xs: 18, sm: 22, lg: 28 }}>
        {title}
      </Typography>
      <Typography variant='h1' fontSize={{ xs: 12, sm: 14, lg: 18 }}>
        {subtitle}
      </Typography>
    </Container>
  );
};

export default PageDescription;
