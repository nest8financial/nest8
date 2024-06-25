import { combineReducers } from 'redux';

/**
 * The Products Reducer sets up state in the
 *      store for the possible products to
 *      buy in the product table, and 
 *      a piece of state to hold new
 *      products before bought by user
 */

/**
 * Gets all available products 
 */
const products = (state = [], action) => {
    if (action.type === 'SET_SINGLE_MONTH_INPUTS') {
        if (action.payload.length === 0) {
          return [];
        }
        return action.payload[0];
    } 
    return state;
  }

/** 
 *  Pulls the newProductSelected state, which stores:
 *      - a value of 0 if there is no new product selection
 *      - displays a number according to the product number
 *             if a new product has been selected to move
 *              towards the shopping cart
 */
const newProductSelected = (state = 0, action) => {
    if (action.type === 'SET_NEW_PRODUCT_SELECTED') {
        return action.payload;
    }
    return state;
}


export default combineReducers({
    products,
    newProductSelected
});
