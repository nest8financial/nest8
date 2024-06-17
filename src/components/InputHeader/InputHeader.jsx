import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { Typography } from '@mui/material';

function InputHeader(){

const [date, setDate] = useState(dayjs()); 


return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
          <DateCalendar 
          value={date} onChange={(newValue) => setDate(newValue)} 
          views={['month', 'year']}
          />
        <Typography>{date.format('MMM YYYY')}</Typography>
        <Container>
            <Button>Add Input</Button>
            <Button>Edit Input</Button>
        </Container>
      </Container>
    </LocalizationProvider>
  );


}


export default InputHeader; 