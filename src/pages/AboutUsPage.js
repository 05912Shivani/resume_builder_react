import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutUsPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Resume Builder is a simple and intuitive tool designed to help you craft
        a professional resume effortlessly. Our goal is to make resume building
        accessible for everyone.
      </Typography>
    </Box>
  );
};

export default AboutUsPage;
