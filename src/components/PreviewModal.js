import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const PreviewModal = ({ open, onClose, content }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Resume Preview
        </Typography>
        <Box>{content}</Box>
      </Box>
    </Modal>
  );
};

export default PreviewModal;
