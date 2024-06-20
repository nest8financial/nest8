import { Button, Box, Container, Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";
import moment from 'moment'



function MyData(){

const userData = useSelector(store=> store.user) // pulls the user data from the user store 
const monthlyInputs = useSelector(store=> store.financialInputs) // pulls the monthly inputs for a user from the financialInputs store

console.log('this is the user data', userData);
console.log('these are the monthly inputs', monthlyInputs);

const today = moment(); // pulls the current date
const currentMonthYear = today.format('MM, YYYY') // reformats the current date to be the month and year
const joinDate = moment(userData.date_joined) // pulls the join date from the User store for the logged in user
const joinMonthYear = joinDate.format('MM, YYYY'); // reformats the join date to the be the month and year 

console.log('this is the current month and year', currentMonthYear);
console.log('this is the join date, month and year', joinMonthYear);

const calculateMissingMonths = (start, current) => {
    let missingMonths = []; // initializes a missingMonths counter to an empty array 
    let startMonth = start.clone(); // creates a startMonth variable by cloning the start date.

    while (startMonth.isSameOrBefore(current)) {
        // Check if the current month is missing in the database. If the month is missing, we execute the code inside the if block
        const monthStr = startMonth.format('MM, YYYY');
        const isMonthMissing = !checkStoreForMonth(monthStr);
  
        if (isMonthMissing) { 
            missingMonths.push(monthStr); // Pushing the missing month string to the missingMonths array
        }
  
        startMonth.add(1, 'month'); // 
      }
  
      return missingMonths;

}

const checkStoreForMonth = (monthStr) => {
    return monthlyInputs.some(input => {
      const inputMonthYear = moment(`${input.year}-${input.month}-01`).format('MM, YYYY');
      return inputMonthYear === monthStr;
    });
  };

const missingMonthsCount = calculateMissingMonths(joinMonthYear, currentMonthYear);


    return(

      <Container>
        <Box>
            <Button variant="contained" sx={{ mb: 2, mr: 2}}>My Reports</Button>
        </Box>
        <Box>
            <Button variant="contained" sx={{ mb: 2, mr: 2}}>My Profile</Button>
        </Box>
        <Box>
            <Button variant="contained" sx={{ mb: 2, mr: 2}}>My Saved Inputs</Button>
        </Box>
        <Box>
        <Typography variant="h2" fontSize={32}>Alerts</Typography>
        <List></List>
        
        </Box>


      </Container>


    )

}


export default MyData; 