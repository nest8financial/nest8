import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import industries from './industry.reducer';
import financialInputs from './financial.inputs.reducer.js';


// rootReducer is the primary reducer for the project
//       - bundles up all of the other reducers for use
//       - imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,
  industries,
  financialInputs  // state pertaining to 6 financial user inputs per month
});

export default rootReducer;
