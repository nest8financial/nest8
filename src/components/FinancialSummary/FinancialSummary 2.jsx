import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from "react";

function FinancialSummary(){

    const variances =  useSelector(store => store.financialMetrics.singleMonthVariances);

    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs()); 

    // const addInput = (date) => {
        
    //     history.push(`/inputs_add_edit/${date.format('MM')}/${date.format('YYYY')}`)
    // }
    

    useEffect(() => {
     dispatch({
        type: "SET_SINGLE_MONTH_VARIANCES",
        payload: {month:month,
            year:year
        } 
     })
    }, [])
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
          <DateCalendar 
          value={date} onChange={(newValue) => setDate(newValue)} 
          views={['month', 'year']}
          openTo='month'
          />
        <Typography textAlign='center' variant='h2' fontSize={32}>{date.format('MMM YYYY')}</Typography>
      </Container>
    </LocalizationProvider>
    )
}

export default FinancialSummary;