import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

function ConfirmPopUp({closePopUp, productId}) {

  const history = useHistory();
  const dispatch = useDispatch();
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
    console.log('product here is', productId)
    dispatch({ type: 'SET_NEW_PRODUCT_SELECTED',
               payload: productId })
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
          <p>Product added to cart.</p>
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