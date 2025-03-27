import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const templates = useSelector((state) => state.templates); // Fetches the list of templates from Redux store
// Handles template selection and navigates to the details-filling page with the selected template ID
  const handleTemplateClick = (templateId) => {
    navigate('/details-filling', { state: { templateId } });
  };


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Resume Builder
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Select a template to start crafting your professional resume quickly and easily.
      </Typography>
          {/* Container for displaying available templates */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {templates.map((template) => (
          <Card
            key={template.id}
            sx={{ width: 300, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
           >
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                {template.name}
              </Typography>
              <Typography variant="body2" align="center">
                A professional layout designed for simplicity and clarity.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTemplateClick(template.id)}
                sx={{ mt: 2, display: 'block', mx: 'auto' }}
               >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;

