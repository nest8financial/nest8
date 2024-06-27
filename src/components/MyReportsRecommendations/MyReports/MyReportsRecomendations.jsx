import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMonthName } from '../../../utilities/utilities.js';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';

function MyReportsRecommendations() {

  const dispatch = useDispatch();
  const months = useSelector(store => store.financialInputs.monthlyInputs);
  const history = useHistory();

  useEffect(() => {
      dispatch({ type: 'GET_MONTHLY_INPUTS' });
    }, [dispatch]);

  // Create a custom underlined text button that looks like a link
  const UnderlinedButton = styled(Button)(({ theme }) => ({
    textDecoration: 'underline', // Underline the text
    textTransform: 'none', // Preserve text case
                    '&:hover': { textDecoration: 'underline' } }))

  const handleMonthClick = (monthID, yearID) => {
    history.push(`/rec_detail/${monthID}/${yearID}`);  
  }

  return (
    <main>
      <h1>My Reports and Recommendations</h1>
    
      <section>
        {months.map(month => {
          return (
            <Box>
              <UnderlinedButton key={month.id} onClick={() => handleMonthClick(month.month, month.year)}>
                  {getMonthName(month.month)} {month.year}
              </UnderlinedButton>
            </Box>
          );
        })}
      </section>
    </main>
  );
}

export default MyReportsRecommendations;