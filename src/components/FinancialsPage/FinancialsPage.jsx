import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import FinancialProgress from "../FinancialProgress/FinancialProgress";
import FinancialRecommendation from "../FinancialRecommendation/FinancialRecommendation";
import FinancialSummary from "../FinancialSummary/FinancialSummary";
import { DatePicker } from '@mui/x-date-pickers'


function FinancialsPage() {

    const dispatch = useDispatch();
    const [dateSelected, setDateSelected] = useState(dayjs()); 
    const userData = useSelector(store => store.user);
    const latestDate = useSelector(store => store.financialInputs.latestMonth);

    useEffect(() => {
        dispatch({ type: 'GET_LATEST_MONTH' })
    }, [])

    useEffect(() => {
        console.log('date::::', dateSelected.format('MM'));
        // convert to a date format that dayjs understands
        const formattedMonth = String(latestDate.month).padStart(2, '0');
        const dateString = `${latestDate.year}-${formattedMonth}-01`;
        const lastestDateFormatted = dayjs(dateString);
        setDateSelected(lastestDateFormatted);
    },[latestDate])


    return(
      <Container style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        <br></br><br></br>
        <Divider sx={{ my: 2 }} textAlign="left" >SELECT DATE for SUMMARY & RECOMMENDATIONS</Divider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ ml: 2 }} textAlign="left">
                <DatePicker label="Select Month and Year"
                            value={dateSelected}
                            onChange={(newValue) => setDateSelected(newValue)} 
                            views={['month', 'year']}
                            maxDate={dayjs()}>            
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