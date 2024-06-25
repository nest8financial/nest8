import { combineReducers } from 'redux';

/**
 * The Products Reducer sets up state in the
 *      store for the possible products to
 *      buy in the product table, and 
 *      a piece of state to hold new
 *      products before bought by user
 */

/**
 * Gets a single month's input data 
 */
const singleMonthInputs = (state = {}, action) => {
    if (action.type === 'SET_SINGLE_MONTH_INPUTS') {
        if (action.payload.length === 0) {
          return {};
        }
        return action.payload[0];
    } 
    return state;
  }



export default combineReducers({
    products,
    newProuctSelected
});
