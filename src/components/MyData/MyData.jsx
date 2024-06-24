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
import { getMonthName } from "../../utilities/utilities";

function MyData() {
  const missingInputs = useSelector(
    (store) => store.financialInputs.missingMonthlyInputs
  ); // pulls the monthly inputs for a user from the financialInputs store

  console.log("these are the missing monthly inputs", missingInputs);

function separateOutMonthAndYear(arrayOfDates) {
    let formattedMissingInputs = []; 
    for (let eachMonth of arrayOfDates) {
      let monthName = getMonthName(eachMonth[1]); // pulls the month from the provided array and converts to a string
    //   console.log("this is the month name", monthName);
      let eachMonthFormatted = [eachMonth[0], monthName]; //resets each array to be a string for the month 
    //   console.log("formatted month is", eachMonthFormatted);

    formattedMissingInputs.push(eachMonthFormatted) // pushes formatted array into formattedMissingInputs
      
    }
    return formattedMissingInputs // returns a new array of arrays with formatted months
  }

 console.log('TESTING', separateOutMonthAndYear(missingInputs)) 

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_MISSING_MONTLY_INPUTS" }); // updates the store upon page load with all missing inputs to render alerts
  }, []);

  return (
    <Container>
      <Box>
        <Button
          onClick={() => history.push("/financials")}
          variant="contained"
          sx={{ mt: 6, mb: 2, mr: 2 }}
        >
          My Reports
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => history.push("/myprofile")}
          variant="contained"
          sx={{ mb: 2, mr: 2 }}
        >
          My Profile
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => history.push("/mysavedinputs")}
          variant="contained"
          sx={{ mb: 2, mr: 2 }}
        >
          My Saved Inputs
        </Button>
      </Box>
      <Box>
        <Typography sx={{ mt: 2 }} variant="h2" fontSize={32}>
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
                            You have uncompleted recommendation action items for
                            {month}
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
