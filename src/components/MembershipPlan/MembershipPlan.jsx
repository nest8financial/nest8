import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import ConfirmPopUp from '../../ConfirmPopUp/ConfirmPopUp';

function MembershipPlan() {
    const [openPopUp, setOpenPopUp] = useState(false);
    const products = useSelector(store => store.products.products)
    const handleAddToCart = () => {
        console.log('popping...')
        setOpenPopUp(true);
        // alert("Confirm Add to Cart Pop-Up");
    };

    const closePopUp = () => {
        setOpenPopUp(false);
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, p: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box
                        height={200}
                        width={200}
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        whiteSpace="nowrap"
                        gap={2}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                    >
                        <Typography variant="h6">One Time Report</Typography>
                        <Typography variant="body1"><s>$50</s> $0</Typography>
                        <Typography variant="body2">30-day free trial</Typography>
                    </Box>
                    <Button variant="contained" onClick={handleAddToCart}>Add to cart</Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box
                        height={200}
                        width={200}
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        whiteSpace="nowrap"
                        gap={2}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                    >
                        <Typography variant="h6">Monthly</Typography>
                        <Typography variant="body1"><s>$25/mth</s> $0</Typography>
                        <Typography variant="body2">30-day free trial</Typography>
                    </Box>
                    <Button variant="contained" onClick={handleAddToCart}>Add to cart</Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box
                        height={200}
                        width={200}
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        whiteSpace="nowrap"
                        gap={2}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                    >
                    <Box>{products.map(product => (
                        <Typography variant="h6">
                            {product.name} {product.promo_price}<s>{product.price}</s>
                        </Typography>
                    ))}
                    </Box>
                        {/* // <Typography variant="h6">Annual</Typography>
                        // <Typography variant="body1"><s>$240/yr or $20/mth</s> $0</Typography>
                        // <Typography variant="body2">30-day free trial</Typography> */}
                    </Box>
                    <Button variant="contained" onClick={handleAddToCart}>Add to cart</Button>
                </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
                <FormControlLabel
                    control={<Checkbox checked readOnly />}
                    label="All-in-one tracker: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                />
            </Box>
            <Box sx={{ mt: 2 }}>
                <FormControlLabel
                    control={<Checkbox checked readOnly />}
                    label="All-in-one tracker: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                />
            </Box>
            { openPopUp ? <ConfirmPopUp closePopUp={closePopUp}/> : '' }
        </div>
    );
}

export default MembershipPlan;
