import { Container, Paper, Typography, Button, Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CheckBoxIcon from '@mui/icons-material/CheckBox';


function OrderConfirmation() {

    const productNumber = useSelector(store => store.products.newProductSelected);
    const products = useSelector(store => store.products.products);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS' })
    },[])
    

    return (
        <Container style={{ paddingTop: '100px'}}>
            <Paper elevation={10} sx={{ p: 3, display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h4" sx={{ mb: 2 }}>Review Cart and Place Order</Typography>
                { productNumber === 1 ||
                productNumber === 2 ||
                productNumber == 3 ?
                    (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Box sx={{ display: 'flex'}}>
                            <CheckBoxIcon color="primary"/>
                            <Typography>{products && products[productNumber-1].name}: ${products && products[productNumber-1].promo_price} <s>${products && products[productNumber-1].price}</s></Typography>
                        </Box>
                        <Typography variant="h5" >Thank you for your order!</Typography>
                        <Typography>Your receipt has been set your your email. 
                        </Typography> 
                    </Box>
                    ) : (
                        'Invalid Product selected, please return to selection page' 
                    )
                }  
                <Button variant="contained"  sx={{ width: 'auto', alignSelf: 'center', mt: 2 }} 
                        onClick={() => history.push('/input_header')}>Start Using Nest 8!
                </Button>
            </Paper>
        </Container>
    )
}

export default OrderConfirmation;



// sx={{ color: 'red',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     p: 2 }}

// { productNumber === 1 ? <Typography></Typography> :
//     productNumber === 2 ? <Typography></Typography> :
//     productNumber === 3 ? <Typography></Typography> :