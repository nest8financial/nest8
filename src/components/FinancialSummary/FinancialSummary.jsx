import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Card, CardContent, Grid, Box, Paper} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { red, green } from '@mui/material/colors';
import FinancialProgress from "../FinancialProgress/FinancialProgress";

// import Grid from '@mui/material/Grid';

function FinancialSummary(){

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
     dispatch({
        type: "GET_SINGLE_MONTH_VARIANCES",
        payload: { month: date.format('MM'),
                   year: date.format('YYYY') } 
     });
    }, [])


    return(
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DateCalendar 
          value={date} onChange={(newValue) => setDate(newValue)} 
          views={['month', 'year']}
          openTo='month'
          />
        <Typography textAlign='center' variant='h2' fontSize={32}>{date.format('MMM YYYY')}</Typography>

      </LocalizationProvider>
      {/* {variances.map(variance => ( */}

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





       {/* <Card key={variance.id}
                sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
            {variance.metric_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card> */}
        {/* <Box key={variance.id}>
          <Box></Box>
          {variance.metric_name}
          {variance.variance_value >= 0 ? 'good!' : 'bad'}
        </Box>  */}
    <FinancialProgress />
    </Container>
    )
}

export default FinancialSummary;

