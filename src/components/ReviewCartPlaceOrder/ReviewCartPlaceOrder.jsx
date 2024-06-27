import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography,
         Container,
         Checkbox,
         FormControlLabel,
         Paper,
         FormGroup,
         Button } from '@mui/material';
import { useHistory } from 'react-router-dom';




function ReviewCartPlaceOrder({productNumber}) {

  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(store => store.products.products);
  const newProductSelected = useSelector(store => store.products.newProductSelected);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_PRODUCTS'});
  },[])

  useEffect(() => {
    if (newProductSelected !== null) {
      setSelectedCheckbox(newProductSelected);
    }
  }, [newProductSelected]);

  const handleChange = (event) => {
    const { name } = event.target;
    setSelectedCheckbox(parseInt(name, 10));
  };

  const handlePlaceOrder = (event) => {
    console.log('pushing to order confirmation, selected:', selectedCheckbox);
    dispatch({ type: 'SET_NEW_PRODUCT_SELECTED',
               payload: selectedCheckbox })  
    dispatch({ type: 'UPDATE_PRODUCT_SELECTED',
               payload: { productId: selectedCheckbox } })
    history.push('/order_confirmation'); 
  }

  return (
    <Container>
      {newProductSelected}
      <Paper elevation={10} sx={{ p: 3, mt: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4">Review Cart and Place Order</Typography>
        <FormGroup>
          {products.map(product => (
            <FormControlLabel
              key={product.id}
              control={
                <Checkbox
                  checked={selectedCheckbox === product.id}
                  onChange={handleChange}
                  name={String(product.id)}
                />
              }
              label={
                <>
                  {product.name}
                  <Typography component="span" sx={{ textDecoration: 'line-through', mx: 1 }}>
                    :  ${product.promo_price}
                  </Typography>
                  ${product.price}
                </>
              }
            />
          ))}
        </FormGroup>
        <Typography>
          Your subscription will renew automatically upon the expiry of the 30-day trial. You can cancel anytime effective from the next cycle.
        </Typography>
        <Button
          sx={{ width: '30%' }}
          variant="contained"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Container>
  );
}

export default ReviewCartPlaceOrder;









//     const history = useHistory();
//     const [checkedProduct, setCheckedProduct] = React.useState(productNumber);

//     const StyledRadio = styled(Radio)(({ theme }) => ({
//         '& .MuiSvgIcon-root': {
//           borderRadius: 2,  // Similar to checkboxes
//           boxSizing: 'border-box',
//           width: 18,  // Size similar to checkboxes
//           height: 18,
//         },
//         '&.Mui-checked': {
//           color: theme.palette.primary.main,
//           '& .MuiSvgIcon-root': {
//             backgroundColor: theme.palette.primary.main,
//             borderRadius: 2,
//           },
//         },
//       }));
      

      
//         const handleSelectProduct = (event) => {
//           setValue(event.target.value);
//         };


//     return (
//         <>
//             <FormControl component="fieldset">
//                 <FormLabel component="legend">Review Cart</FormLabel>
//                 <RadioGroup value={checkedProduct} onChange={handleSelectProduct}>
//                     <FormControlLabel value="1" control={<StyledRadio />} label="One-Time Report" />
//                     <Typography>$0</Typography><Typography>$50/single report</Typography>
//                     <FormControlLabel value="2" control={<StyledRadio />} label="Monthly" />
//                     <Typography>$0</Typography><Typography>$20/month</Typography>
//                     <FormControlLabel value="3" control={<StyledRadio />} label="Annual" />
//                     <Typography>$0</Typography><Typography>$240/year or $20/month</Typography>
//                 </RadioGroup>
//             </FormControl>
//             <Typography>Your subscription will renew automatically upon the expiry of the 30 day trial.  You can cancel anytime effective frmo the next cycle.</Typography>
//             <Button variant="contained" 
//                     onClick={() => {history.push('/order_confirmation')}}>Place Order</Button>
//         </>
//     )
// }

