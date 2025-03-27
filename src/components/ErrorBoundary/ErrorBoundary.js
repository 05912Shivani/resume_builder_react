import React, { Component } from 'react';
import { Typography, Box, Button } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };// State to track if an error has occurred
  }
 // Lifecycle method that updates state when an error is encountered
  static getDerivedStateFromError() {
    return { hasError: true };
  }
 // Logs error details to the console for debugging
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }
// Function to reset state and reload the page when retry is clicked
  handleRetry = () => {
    this.setState({ hasError: false });// Reset error state
    window.location.reload();// Reload the page to attempt recovery
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h5" color="error">
            Something went wrong.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please try refreshing the page or contact support.
          </Typography>
          <Button variant="contained" color="primary" onClick={this.handleRetry}>
            Retry
          </Button>
        </Box>
      );
    }

    return this.props.children;// Render children components if no error occurred
  }
}

export default ErrorBoundary;


