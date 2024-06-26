import { FormControlLabel, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function OrderConfirmation({productNumber}) {

    const history = useHistory();

    return (
        <>
            { productNumber === 1 ||
              productNumber === 2 ||
              productNumber == 3 ? <CheckBoxIcon color="primary"/> : ''}
            { productNumber === 1 ? <Typography></Typography> :
              productNumber === 2 ? <Typography></Typography> :
              productNumber === 3 ? <Typography></Typography> :
                 'Invalid Product selected, please return to selection page'}
             { productNumber === 1 ||
               productNumber === 2 ||
               productNumber == 3 ? 
                <Typography>Thank you for your order!<br>
                    </br>Your receipt has been set your your email.
                </Typography> : '' }
            <Button variant="contained"
                    onClick={() => history.push('/input_header')}>Start Using Nest 8!
            </Button>
        </>
    )
}

export default OrderConfirmation;