import React, { Component } from 'react';
import { Typography, Box, Button } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
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

    return this.props.children;
  }
}

export default ErrorBoundary;


