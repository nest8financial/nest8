import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Grid, Box, Paper} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { experimentalStyled as styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { red, green } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
import FinancialRecommendation from "../FinancialRecommendation/FinancialRecommendation";
// const setDate = (month, year) => ({
//   type: 'SET_DATE',
//   payload: { month, year }
// });


function FinancialSummary(){

    const variances =  useSelector(store => store.financialMetrics.singleMonthVariances);
    const history = useHistory();

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
     dispatch({
        type: "GET_SINGLE_MONTH_VARIANCES",
        payload: { month: date.format('MM'),
                   year: date.format('YYYY') } 
     });
    }, [dispatch,date])

    // const handleDateChange = (newValue) => {
    //   setDateState(newValue);
    //   const month = newValue.format('MM');
    //   const year = newValue.format('YYYY');
    //   dispatch(setDate(month, year));
    //   history.push(`/financial_recommendation`);
    // };
  

    return(
      <Container> 
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DateCalendar 
          value={date} 
          onChange={newValue => setDate(newValue)}
          views={['month', 'year']}
          openTo='month'
          />
        <Typography textAlign='center' variant='h2' fontSize={32}>{date.format('MMM YYYY')}</Typography>

      </LocalizationProvider>

            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {variances.map((variance, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item>{variance.metric_name}
                  {variance.variance_value >= 0 ? 
                    <CheckCircleIcon sx={{ color: green[500] }}/> : 
                    <WarningIcon sx={{ color: red[900] }} />}
                     
                     
                  </Item>

                </Grid>
              ))}
            </Grid>
          </Box>        
<FinancialRecommendation  month= {date.format('MM')}
year= {date.format('YYYY')}/>
    </Container>
    
    )
}

export default FinancialSummary;


// industry - user
//  profit margin variance .1 - .2 = -.1 BAD  user- industry
//  asset turnover variance 2.0 - 1.5  =  .5 GOOD
//  financial leverage variance  1.25 - 2 = 
// roe                .3 - .25
// tax burden         .2 - .5
// interest burden    .3 - .2 


// for metric 3, 5 and 6 variance is industry - user
// for metric 1, 2, and 4 variance is user - industry