import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ConfirmPopUp({closePopUp}) {

  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleClickOpen();
  }, [])

  const handleClickOpen = () => {
    console.log('open popup?')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closePopUp();
  };

  const handleConfirm = () => {
    setOpen(false);
    // set piece of state here so login or account registration 
    //     goes to review cart place order
    console.log('popup click on confirm?')
    history.push('/login');
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
<<<<<<< HEAD
          <p>Product added to cart.</p>
=======
          <p>Product added to cart</p>
>>>>>>> main
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmPopUp;