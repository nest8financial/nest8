import {
  Button,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function MyData() {
  const missingInputs = useSelector((store) => store.financialInputs.missingMonthlyInputs); // pulls the monthly inputs for a user from the financialInputs store

  console.log("these are the monthly inputs", missingInputs);

const dispatch = useDispatch(); 
const history = useHistory();

useEffect(() => {
    dispatch({ type: 'GET_MISSING_MONTLY_INPUTS'})  // updates the store upon page load with all missing inputs to render alerts 
}, [])

// Button routing functions 
function changeToMyReports(){
    history.push('/financials')
}

function changeToMyProfile(){
    history.push('/myprofile')
}

function changeToMySavedInputs(){
    history.push('/mysavedinputs')
}


  return (
    <Container>
      <Box>
        <Button onClick={changeToMyReports} variant="contained" sx={{ mt: 6, mb: 2, mr: 2 }}>
          My Reports
        </Button>
      </Box>
      <Box>
        <Button onClick={changeToMyProfile} variant="contained" sx={{ mb: 2, mr: 2 }}>
          My Profile
        </Button>
      </Box>
      <Box>
        <Button onClick={changeToMySavedInputs} variant="contained" sx={{ mb: 2, mr: 2 }}>
          My Saved Inputs
        </Button>
      </Box>
      <Box>
        <Typography  sx={{ mt: 2 }} variant="h2" fontSize={32}>
          Alerts
        </Typography>
        {missingInputs.length > 0 && (
          <>
            <List>
              {missingInputs.map((month) => (
                <ListItem key={month}>
                  <Paper>
                    <Box>
                        <ListItemText
                        primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                            {month}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body2" color="error">
                            You have uncompleted recommendation action items for{month}
                            {month}
                            </Typography>
                        }
                        />
                    </Box>
                  </Paper>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Container>
  );
}

export default MyData;
