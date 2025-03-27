import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import PreviewIcon from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import { resetFormData } from '../../redux/formDataSlice'; // Redux action to reset form data

const Header = () => {
  const location = useLocation();// Get current route path
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  const isPreviewPage =
    location.pathname === '/preview1' ||
    location.pathname === '/preview2' ||
    location.pathname === '/preview3' ||
    location.pathname === '/preview4';

  // Function to reset form data when navigating to another page
  const handleReset = () => {
    dispatch(resetFormData()); 
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Resume Builder
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" onClick={handleReset}>
            <HomeIcon sx={{ mr: 1 }} /> Home
          </Button>
          <Button color="inherit" component={Link} to="/home" onClick={handleReset}>
            <BuildIcon sx={{ mr: 1 }} /> Build Resume
          </Button>
          {isPreviewPage && (
            <Button color="inherit" component={Link} to={location.pathname}>
              <PreviewIcon sx={{ mr: 1 }} /> Preview
            </Button>
          )}
          <Button color="inherit" component={Link} to="/about" onClick={handleReset}>
            <InfoIcon sx={{ mr: 1 }} /> About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
