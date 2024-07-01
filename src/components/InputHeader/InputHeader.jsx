import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';


function InputHeader(){

const history = useHistory(); 
const dispatch = useDispatch()
const [date, setDate] = useState(dayjs()); 

const addInput = (date) => {
  console.log('month is', date.format('MM'));
  console.log('year is', date.format('YYYY'));
    history.push(`/inputs_add_edit/${date.format('MM')}/${date.format('YYYY')}`)
}

return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant='h1' style={{ paddingTop: '100px', alignItems: 'center', fontSize: '32px', fontWeight: 'inherit'}}>Input Financial Data</Typography>
      <Container style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <DateCalendar 
          value={date} onChange={(newValue) => setDate(newValue)} 
          views={[ 'year', 'month']}
          openTo='year'
          maxDate={dayjs()}
          />
        <Typography textAlign='center' variant='h2' fontSize={32}>{date.format('MMM YYYY')}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" sx={{ mb: 2, mr: 2}} onClick={() => addInput(date)}>Select Month</Button>
        </Box>
      </Container>
    </LocalizationProvider>



  );


}


export default InputHeader; 