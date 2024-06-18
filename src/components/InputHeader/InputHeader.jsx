import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function InputHeader(){

const history = useHistory(); 
const [date, setDate] = useState(dayjs()); 

const addInput = (date) => {
    history.push(`/FinancialInputsAddEdit/${date.format('MM')}&${date.format('YYYY')}`)
}

return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
          <DateCalendar 
          value={date} onChange={(newValue) => setDate(newValue)} 
          views={['month', 'year']}
          openTo='month'
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