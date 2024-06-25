import { FormControlLabel, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReviewCartPlaceOrder({productNumber}) {

    const history = useHistory();
    const [checkedProduct, setCheckedProduct] = React.useState(productNumber);
    const StyledRadio = styled(Radio)(({ theme }) => ({
        '& .MuiSvgIcon-root': {
          borderRadius: 2,  // Similar to checkboxes
          boxSizing: 'border-box',
          width: 18,  // Size similar to checkboxes
          height: 18,
        },
        '&.Mui-checked': {
          color: theme.palette.primary.main,
          '& .MuiSvgIcon-root': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
          },
        },
      }));
      

      
        const handleSelectProduct = (event) => {
          setValue(event.target.value);
        };


    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Review Cart</FormLabel>
                <RadioGroup value={checkedProduct} onChange={handleSelectProduct}>
                    <FormControlLabel value="1" control={<StyledRadio />} label="One-Time Report" />
                    <Typography>$0</Typography><Typography>$50/single report</Typography>
                    <FormControlLabel value="2" control={<StyledRadio />} label="Monthly" />
                    <Typography>$0</Typography><Typography>$20/month</Typography>
                    <FormControlLabel value="3" control={<StyledRadio />} label="Annual" />
                    <Typography>$0</Typography><Typography>$240/year or $20/month</Typography>
                </RadioGroup>
            </FormControl>
            <Typography>Your subscription will renew automatically upon the expiry of the 30 day trial.  You can cancel anytime effective frmo the next cycle.</Typography>
            <Button variant="contained" 
                    onClick={() => {history.push('/order_confirmation')}}>Place Order</Button>
        </>
    )
}

export default ReviewCartPlaceOrder;