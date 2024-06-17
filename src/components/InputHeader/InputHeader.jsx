import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function InputHeader(){

const history = useHistory(); 
const [date, setDate] = useState(dayjs()); 

const addInput = (date) => {
    history.push({
        pathname: 'add_input',
        state: {month: date.format('MM'), year: date.format('YYYY')}
    })
}

const editInput = (date) => {
    history.push({
        pathname: 'edit_input',
        state: {month: date.format('MM'), year: date.format('YYYY')}

    })
}


return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
          <DateCalendar 
          value={date} onChange={(newValue) => setDate(newValue)} 
          views={['month', 'year']}
          openTo='month'
          />
        <Typography>{date.format('MMM YYYY')}</Typography>
        <Container>
            <Button onClick={addInput(date)}>Add Input</Button>
            <Button onClick={editInput(date)}>Edit Input</Button>
        </Container>
      </Container>
    </LocalizationProvider>
  );


}


export default InputHeader; 