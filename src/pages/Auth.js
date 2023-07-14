import React, { useState } from 'react';

import LoginCard from '../components/LoginCard';
import CreateAccountCard from '../components/CreateAccountCard';
import { Box } from '@mui/material';
import ResetPassword from '../components/ResetPassword';

const Auth = () => {
  const [login, setLogin] = useState('login');

  return (
    <Box
      sx={{
        minHeight: {
          xs: 'calc(100vh - 112px)',
          sm: 'calc(100vh - 128px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      {login === 'login' ? (
        <LoginCard login={setLogin} />
      ) : login === 'register' ? (
        <CreateAccountCard login={setLogin} />
      ) : (
        <ResetPassword login={setLogin} />
      )}
    </Box>
  );
};

export default Auth;
