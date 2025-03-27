import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();// Initialize navigation hoo

  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Resume Builder
      </Typography>
      <Typography variant="body1" gutterBottom>
        Create a professional resume in minutes using our simple and elegant templates.
      </Typography>
   {/* Button to navigate to the Home page where users can select a template */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/home')}// Navigates to the Home page when clicked
        sx={{ mt: 2 }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
