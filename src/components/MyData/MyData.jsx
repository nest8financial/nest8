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
import { differenceInMonths, startOfMonth, endOfMonth, parse, format, parseISO } from 'date-fns';
import { useEffect } from "react";

function MyData() {
  const missingInputs = useSelector((store) => store.financialInputs.missingMonthlyInputs); // pulls the monthly inputs for a user from the financialInputs store

  console.log("these are the monthly inputs", missingInputs);



const dispatch = useDispatch(); 

useEffect(() => {
    dispatch({ type: 'GET_MISSING_MONTLY_INPUTS'})
}, [])



const missingMonths = []; 

  return (
    <Container>
      <Box>
        <Button variant="contained" sx={{ mb: 2, mr: 2 }}>
          My Reports
        </Button>
      </Box>
      <Box>
        <Button variant="contained" sx={{ mb: 2, mr: 2 }}>
          My Profile
        </Button>
      </Box>
      <Box>
        <Button variant="contained" sx={{ mb: 2, mr: 2 }}>
          My Saved Inputs
        </Button>
      </Box>
      <Box>
        <Typography variant="h2" fontSize={32}>
          Alerts
        </Typography>
        {missingMonths.length > 0 && (
          <>
            <List>
              {missingMonths.map((month) => (
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
