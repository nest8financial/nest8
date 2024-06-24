import { Button, Box, Container, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




function MyData(){

    const history = useHistory();

    return(

      <Container>
        <Box>
            <Button variant="contained" 
                    sx={{ mb: 2, mr: 2}}
                    onClick={() => history.push('/home')}>My Reports</Button>
        </Box>
        <Box>
            <Button variant="contained" 
                    sx={{ mb: 2, mr: 2}}
                    onClick={() => history.push('/home')}>My Profile</Button>
        </Box>
        <Box>
            <Button variant="contained" 
                    sx={{ mb: 2, mr: 2}}
                    onClick={() => history.push('/my_inputs')}>My Saved Inputs</Button>
        </Box>
        <Box>
        <Typography variant="h2" fontSize={32}>Alerts</Typography>

        
        </Box>


      </Container>


    )

}


export default MyData; 