import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function MonthDetail() {
  const { monthId } = useParams();
  const dispatch = useDispatch();
  const monthDetails = useSelector((store) => store.singleMonthInputs);

  useEffect(() => {
    dispatch({ type: 'GET_SINGLE_MONTH_INPUT', payload: monthId });
  }, [dispatch, monthId]);

  return (
    <div>
      <h2>Month Details</h2>
      <div>
        <p>ID: {monthDetails.id}</p>
        <p>User ID: {monthDetails.user_id}</p>
        <p>Year: {monthDetails.year}</p>
        <p>Month: {monthDetails.month}</p>
        <p>Net Income: {monthDetails.net_income}</p>
        <p>Sales: {monthDetails.sales}</p>
        <p>Assets: {monthDetails.assets}</p>
        <p>Equity: {monthDetails.equity}</p>
        <p>Tax Rate: {monthDetails.tax_rate}</p>
        <p>Earnings: {monthDetails.earnings}</p>
      </div>
    </div>
  );
}

export default MonthDetail;
