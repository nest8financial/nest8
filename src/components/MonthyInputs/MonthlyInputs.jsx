import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MonthlyInputs() {

    const dispatch = useDispatch();
    const month = useSelector(store => store.monthly_inputs);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_MONTHLY_INPUTS' });
      }, []);
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}

export default MonthlyInputs;