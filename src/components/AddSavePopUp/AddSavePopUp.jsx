// SimpleSnackbar.jsx
import React from 'react';
import { Snackbar, Button } from '@mui/material';

const AddSavePopUp = ({ open, handleClose }) => {
  return (
    <div>
      <Snackbar
        sx={{ p: 10 }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Input successful!"
      />
    </div>
  );
};

export default AddSavePopUp;
