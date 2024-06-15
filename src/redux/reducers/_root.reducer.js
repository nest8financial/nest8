import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import financialInputs from './financial.inputs.reducer.js';

// rootReducer is the primary reducer for the project
//       - bundles up all of the other reducers for use
//       - imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // errors state, for registrationMessage and loginMessage
  user, // user state, stores id and username when someone is logged in
  financialInputs  // state pertaining to 6 financial user inputs per month
});

export default rootReducer;
