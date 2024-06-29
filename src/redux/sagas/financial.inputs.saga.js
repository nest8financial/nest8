import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


/**
 * Get a single month's of financial inputs for a user
 */
function* getSingleMonthInputs(action) {
  console.log('hellllloooooo')
  try {
    console.log('in get here is action.payload', action.payload)
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_inputs/${action.payload.month}&${action.payload.year}`
    })
    console.log('did get, here is reposnse: ', response.data);
    yield put({
        type: 'SET_SINGLE_MONTH_INPUTS',
        payload: response.data })
  } catch (error) {
    console.log('Error while getting single month\'s inputs:', error);
  }
}

/**
 * Get all the monthly inputs for a user
 */
function* getMonthlyInputs(action) {
    try {
      const response = yield axios({
          method: 'GET',
          url: `/api/financial_inputs`})
      yield put({
          type: 'SET_MONTHLY_INPUTS',
          payload: response.data})
    } catch (error) {
      console.log('Error while getting monthly inputs:', error);
    }
  }


/**
 * Get all the MISSING monthly inputs for a user
 */
function* getMissingMonthlyInputs(action) {
  console.log('action.payload for the missing monthly inputs is', action.payload);
  try {
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_inputs/missing/`})
        
    yield put({
        type: 'SET_MISSING_MONTHLY_INPUTS',
        payload: response.data})
  } catch (error) {
    console.log('Error while getting missing monthly inputs:', error);
  }
}

/**
 * Get all the monthly inputs with INCOMPLETE RECOMMENDATION ACTIONS for a user
 */
function* getIncompleteRecsMonthlyInputs(action) {
  console.log('action.payload for the incomplete monthly recs is', action.payload);
  try {
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_inputs/incomplete_recs/`})
        
    yield put({
        type: 'SET_INCOMPLETE_RECS_MONTHLY_INPUTS',
        payload: response.data})
  } catch (error) {
    console.log('Error while getting missing monthly inputs:', error);
  }
}


/**
 * Add a single month's inputs for a user
 */
function* addSingleMonthInputs(action) {
  console.log('actionpayload',action.payload)
  try {
    const response = yield axios({
        method: 'POST',
        url: `/api/financial_inputs`,
        data: action.payload });
    yield put({ type: 'GET_MONTHLY_INPUTS' });
  } catch (error) {
    console.log('Error while adding a single month\'s inputs:', error);
  }
}

/**
 * Update a single month's inputs for a user
 */
function*updateSingleMonthInputs(action) {
  try {
    const response = yield axios({
        method: 'PUT',
        url: `/api/financial_inputs`,
        data: action.payload})
    yield put({ type: 'GET_MONTHLY_INPUTS' });
  } catch (error) {
    console.log('Error while updating a single month\'s inputs:', error);
  }
}

/**
 * Get the Latest month available for a user in the monthly_inputs file
 *    - used to load as a default in the financials page
 */
function* getLatestMonth(action) {
  try {
    console.log('in get lastest month here is action.payload', action.payload)
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_inputs/latest_month`
    })
    console.log('did get, here is reposnse: ', response.data);
    yield put({
        type: 'SET_LATEST_MONTH',
        payload: response.data })
  } catch (error) {
    console.log('Error while getting single month\'s inputs:', error);
  }
}

function* financialInputsSaga() {
  yield takeLatest('GET_SINGLE_MONTH_INPUTS', getSingleMonthInputs);
  yield takeLatest('GET_MONTHLY_INPUTS', getMonthlyInputs);
  yield takeLatest('ADD_SINGLE_MONTH_INPUTS', addSingleMonthInputs);
  yield takeLatest('UPDATE_SINGLE_MONTH_INPUTS', updateSingleMonthInputs);
  yield takeLatest('GET_MISSING_MONTHLY_INPUTS', getMissingMonthlyInputs);
  yield takeLatest('GET_INCOMPLETE_RECS_MONTHLY_INPUTS', getIncompleteRecsMonthlyInputs);
  yield takeLatest('GET_LATEST_MONTH', getLatestMonth);
}

export default financialInputsSaga;
