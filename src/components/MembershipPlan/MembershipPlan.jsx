import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

function MembershipPlan() {
    const handleAddToCart = () => {
        alert("Confirm Add to Cart Pop-Up");
    };

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
                        <Typography variant="h6">Annual</Typography>
                        <Typography variant="body1"><s>$240/yr or $20/mth</s> $0</Typography>
                        <Typography variant="body2">30-day free trial</Typography>
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
        </div>
    );
}

export default MembershipPlan;
