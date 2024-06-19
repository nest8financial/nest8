import { Button, Box, Container, Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";
import moment from 'moment'


function MyData(){

const userData = useSelector(store=> store.user) // pulls the user data from the user store 
const monthlyInputs = useSelector(store=> store.financialInputs) // pulls the monthly inputs for a user from the financialInputs store

console.log('this is the user data', userData);
console.log('these are the monthly inputs', monthlyInputs);


const today = moment();
const todaysDate = today.format('MM, YYYY')
const start = userData.date_joined
const startFormatted = moment(start)

console.log('this is the start date', start);
console.log('this is the FORMATTED start date', startFormatted);


console.log('this is todays month and year', todaysDate);

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

        
        </Box>


      </Container>


    )

}


export default MyData; 