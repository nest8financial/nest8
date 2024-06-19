import { Button, Box, Container, Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";
import moment from 'moment'


function MyData(){

const userData = useSelector(store=> store.user)
const monthlyInputs = useSelector(store=> store.financialInputs)

console.log('this is the user data', userData);
console.log('these are the monthly inputs', monthlyInputs);


const today = moment();
const todaysDate = today.format('MM, YYYY')

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