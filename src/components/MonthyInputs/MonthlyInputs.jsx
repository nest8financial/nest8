import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MonthlyInputs() {

    const dispatch = useDispatch();
    const months = useSelector(store => store.months);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_MONTHLY_INPUTS' });
      }, [dispatch]);

      const handleMonthClick = (monthID) => {
        console.log('handleMonthCick', monthID);
        
        dispatch({
        type: 'GET_SINGLE_MONTH_INPUT',
        payload: {monthID}
      })
      console.log('monthly_details')
        history.push(`/monthly_inputs/${monthID}`);  //reduces dependencies and makes the function more decoupled
      }
  return (
    <main>
      <h1>Monthly Financial Inputs</h1>
      <section>
        {months.map(month => {
          return (
            <div key={month.id} onClick={() => handleMonthClick(month.id)}>
                {month.month} {month.year}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MonthlyInputs;