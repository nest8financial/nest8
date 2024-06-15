import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputUpdateFinancials from "../financialInputsAddEditinancials/financialInputsAddEdit";
import {
    HashRouter as Router,
    Route,
  } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function TestApp() {

    const history = useHistory();

    const handleAClick = () => {
        // history.push('/input_financials/6/2024');
      }

    return (
        <Router>
            <InputUpdateFinancials month={6} year={2024}/>
            <button onClick={handleAClick}>to page</button>
            <Route exact path="/input_financials/:month/:year">
                <InputUpdateFinancials/>
            </Route>
        </Router>
    )
}

export default TestApp;


