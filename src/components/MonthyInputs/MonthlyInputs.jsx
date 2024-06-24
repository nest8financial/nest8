import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMonthName } from '../../utilities/utilities';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';

function MonthlyInputs() {

    const dispatch = useDispatch();
    const months = useSelector(store => store.financialInputs.monthlyInputs);
    const history = useHistory();

    // Create a custom underlined text button that looks like a link
    const UnderlinedButton = styled(Button)(({ theme }) => ({
      textDecoration: 'underline', // Underline the text
      textTransform: 'none', // Preserve text case
                     '&:hover': { textDecoration: 'underline' } }))


    useEffect(() => {
        dispatch({ type: 'GET_MONTHLY_INPUTS' });
      }, [dispatch]);

      const handleMonthClick = (monthID, yearID) => {
        console.log('handleMonthCick', monthID);
        
      console.log('monthly_details')
        history.push(`/inputs_add_edit/${monthID}/${yearID}`);  //reduces dependencies and makes the function more decoupled
      }
  return (
    <main>
      <h1>Monthly Financial Inputs</h1>
    
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

export default MonthlyInputs;

