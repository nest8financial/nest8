import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import industries from './industry.reducer';
import financialInputs from './financial.inputs.reducer.js';
import financialMetrics from './financial.metrics.reducer.js';


// rootReducer is the primary reducer for the project
//       - bundles up all of the other reducers for use
//       - imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // errors state, for registrationMessage and loginMessage
  user, // user state, stores id and username when someone is logged in
  financialInputs,  // state pertaining to 6 financial user inputs per month
  financialMetrics, // state pertaining to 6 computed financial metrics & variances
  industries,
 

});

export default rootReducer;
