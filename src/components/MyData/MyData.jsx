import {
  Button,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper, 
  Link
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
    console.log('arrayyyyy',arrayOfDates)
    for (let eachMonth of arrayOfDates) {
      let monthName = getMonthName(eachMonth[1]); // pulls the month from the provided array and converts to a string
    //   console.log("this is the month name", monthName);
      let eachMonthFormatted = [eachMonth[0], monthName, eachMonth[1]]; //resets each array to be a string for the month 
    //   console.log("formatted month is", eachMonthFormatted);

    formattedMissingInputs.push(eachMonthFormatted) // pushes formatted array into formattedMissingInputs
      
    }
    return formattedMissingInputs // returns a new array of arrays with formatted months
  }

  let missingInputsToDisplay = separateOutMonthAndYear(missingInputs);

  const handleLinkClick = (e, year, month) => {
    e.preventDefault();
    console.log('month and year, about to history.push:', month, year,':')
    history.push(`/inputs_add_edit/${month}/${year}/`);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_MISSING_MONTHLY_INPUTS" }); // updates the store upon page load with all missing inputs to render alerts
    separateOutMonthAndYear(missingInputs)
}, []);

  return (
    <Container>
      <Box>
        <Button
          onClick={() => history.push("/my_reports_recommendations")}
          variant="contained"
          sx={{ mt: 6, mb: 2, mr: 2 }}
        >
          My Reports
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => history.push("/my_profile")}
          variant="contained"
          sx={{ mb: 2, mr: 2 }}
        >
          My Profile
        </Button>
      </Box>
      <Box>
        <Button
          onClick={() => history.push("/my_inputs")}
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
        {missingInputsToDisplay.length > 0 ? (
          <>
            <List>
              {missingInputsToDisplay.map((date) => (
                <ListItem key={`${date[0]}-${date[1]}`}>
                  <Paper elevation={4} sx={{width: '600px', height: '100px', mb: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px'}}>
                    <Box>
                      <ListItemText
                        primary={
                          <Typography component="span" variant="subtitle1" fontWeight="bold">
                            {date[1]} {date[0]}
                          </Typography>
                        }
                        secondary={
                        <Link
                            href="#"
                            onClick={(e) => handleLinkClick(e, date[0], date[2])}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            <Typography component="span" variant="body2" color="error">
                                You have uncompleted recommendation action items for {date[1]} {date[0]}
                            </Typography>
                          </Link>
                        }
                      />
                    </Box>
                  </Paper>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
            <Typography variant="body1" sx={{ mt: 2, color: 'green' }}>
                No current alerts. All monthly inputs are up to date. 
            </Typography>
        )}
      </Box>
    </Container>
  );
}

export default MyData;
