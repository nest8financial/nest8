import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Paper, Typography, Divider, Container } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { red, green } from '@mui/material/colors';
import { getMonthName } from "../../utilities/utilities";





function FinancialSummary({month, year, company}){

    const variances =  useSelector(store => store.financialMetrics.singleMonthVariances);

    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs()); 
    
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    

    useEffect(() => {
     console.log('repulling variances');
     dispatch({
        type: "GET_SINGLE_MONTH_VARIANCES",
        payload: { month, year }  
     });
    }, [dispatch, month, year])


    return(
      <Container >
      <br></br>
      <Divider sx={{ my: 2 }} textAlign="left" >SUMMARY</Divider>
      <br></br>
      <Paper elevation={10}>
        <br></br><br></br>
        <Typography variant="h5" align="center">Financial Summary for</Typography>
        <Typography variant="h4" align="center"> {company}</Typography>
        <Typography variant="h5" align="center">{getMonthName(month)} {year}</Typography>
        {variances.length === 0 ?
         (
          <Box>
            <Typography sx={{ color: 'red',
                              fontStyle: 'italic',
                              textAlign: 'center',
                              p: 2 }}
                        variant="body1"
              >Please provide inputs for this month to see Summary information
            </Typography>
            </Box>
         ) : (
          <Box >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
              {variances.map((variance, index) => (
                <Grid item xs={2}
                          sm={4} 
                          md={4}
                          sx={{ display: 'flex', mt: 1.2, mb: 1.2, boxShadow: 10, borderRadius: 1 }}
                          key={index}>
                  {/* This is the color bar on the left of the box */}
                  <Box sx={{width: .04, height: 1, borderRadius: 1,
                      backgroundColor: (variance.variance_value === null ? 'none' : (variance.variance_value >= 0 ? 
                        green[500] : red[700]) ) }}>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'column', width: 1}}>
                    <Typography textAlign="left" sx={{pl: 2, pt: 2}}>{variance.metric_name}</Typography>
                    <Item sx={{textAlign: 'left'}}>
                      {variance.variance_value === null ? 
                      <Typography>N/A as some inputs are zero</Typography> : 
                      (variance.variance_value >= 0 ? 
                          <CheckCircleIcon sx={{ color: green[500] }}/> : 
                          <WarningIcon sx={{ color: red[700] }} />)
                      }  
                    </Item>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
         )}
         <br></br><br></br>
         </Paper>
      </Container>
    )
}

export default FinancialSummary;
