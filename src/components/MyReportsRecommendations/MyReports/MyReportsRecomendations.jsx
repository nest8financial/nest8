import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMonthName } from '../../utilities/utilities';
function ReportsRecommendations() {

    const dispatch = useDispatch();
    const months = useSelector(store => store.financialInputs.monthlyInputs);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_MONTHLY_INPUTS' });
      }, [dispatch]);

      const handleMonthClick = (monthID, yearID) => {
        console.log('handleMonthCick', monthID);
        
    //     dispatch({
    //     type: 'GET_SINGLE_MONTH_INPUT',
    //     payload: {monthID}
    //   })
      console.log('Reports & Recommendations')
        history.push(`/rec_detail/${monthID}/${yearID}`);  //reduces dependencies and makes the function more decoupled
      }
  return (
    <main>
      <h1>My Reports and Recommendations</h1>
    
      <section>
        {months.map(month => {
          return (
            <div key={month.id} onClick={() => handleMonthClick(month.month, month.year)}>
                {getMonthName(month.month)} {month.year}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default ReportsRecommendations;