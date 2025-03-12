import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Resume Builder
      </Typography>
      <Typography variant="body1" gutterBottom>
        Create a professional resume in minutes using our simple and elegant templates.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/home')}
        sx={{ mt: 2 }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
