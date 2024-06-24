import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Card, CardContent, Grid, Box, Paper, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import FinancialProgress from "../FinancialProgress/FinancialProgress";
import FinancialRecommendation from "../FinancialRecommendation/FinancialRecommendation";
import FinancialSummary from "../FinancialSummary/FinancialSummary";
// import { DatePicker } from "@mui/lab";
import { DatePicker } from '@mui/x-date-pickers'



function FinancialsPage() {

    const [dateSelected, setDateSelected] = useState(dayjs()); 
    const userData = useSelector(store => store.user);
    // const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //   ...theme.typography.body2,
    //   padding: theme.spacing(2),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // }));
    

    useEffect(() => {
    }, [])


    return(
      <Container>
        <br></br><br></br>
        <Divider sx={{ my: 2 }} textAlign="left" >SELECT DATE for SUMMARY & RECOMMENDATIONS</Divider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ ml: 2 }} textAlign="left">
                <DatePicker label="Select Month and Year"
                            value={dateSelected}
                            onChange={(newValue) => setDateSelected(newValue)} 
                            views={['month', 'year']}>            
                </DatePicker>
            </Box>
        </LocalizationProvider>
        <FinancialSummary month={dateSelected.format('MM')}
                        year={dateSelected.format('YYYY')} 
                        company={userData.company}/>
        <FinancialRecommendation month={dateSelected.format('MM')}
                                year={dateSelected.format('YYYY')}
                                company={userData.company} />
        <FinancialProgress company={userData.company} />
    </Container>
    )
}

export default FinancialsPage;