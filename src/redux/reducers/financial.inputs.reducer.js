import { combineReducers } from "redux";

/**
 * The financialInputs Reducer set up state in the
 *      store relating to the six financial inputs
 *      that the usere enters each month
 */

/**
 * Gets a single month's input data
 */
const singleMonthInputs = (state = {}, action) => {
  if (action.type === "SET_SINGLE_MONTH_INPUTS") {
    if (action.payload.length === 0) {
      return {};
    }
    return action.payload[0];
  }
  return state;
};

/**
 * Gets all of the monthly inputs for a user
 */
const monthlyInputs = (state = [], action) => {
  if (action.type === "SET_MONTHLY_INPUTS") {
    return action.payload;
  }
  return state;
};

/**
 * Gets all of the MISSING monthly inputs for a user
 */
const missingMonthlyInputs = (state = [], action) => {
  if (action.type === "SET_MISSING_MONTHLY_INPUTS") {
    return action.payload;
  }
  return state;
};

/**
 * Gets all of the MISSING monthly inputs for a user
 */
const incompleteRecsMonthlyInputs = (state = [], action) => {
  if (action.type === "SET_INCOMPLETE_RECS_MONTHLY_INPUTS") {
    return action.payload;
  }
  return state;
};

/**
 * The most recent month for a user in the monthly inputs file
 */
const latestMonth = (state = 0, action) => {
  if (action.type === "SET_LATEST_MONTH") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  singleMonthInputs,
  monthlyInputs,
  missingMonthlyInputs,
  incompleteRecsMonthlyInputs,
  latestMonth,
});
