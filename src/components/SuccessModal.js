import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const SuccessModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your resume has been downloaded successfully!</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;

