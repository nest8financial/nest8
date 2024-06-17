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
        url: `/api/financial_inputs/${action.payload.month}&${action.payload.year}`})
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
          url: `/api/financial_inputs` })
      yield put({
          type: 'SET_MONTHLY_INPUTS',
          payload: response.data[0] })
    } catch (error) {
      console.log('Error while getting monthly inputs:', error);
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

function* financialInputsSaga() {
  yield takeLatest('GET_SINGLE_MONTH_INPUTS', getSingleMonthInputs);
  yield takeLatest('GET_MONTHLY_INPUTS', getMonthlyInputs);
  yield takeLatest('ADD_SINGLE_MONTH_INPUTS', addSingleMonthInputs);
  yield takeLatest('UPDATE_SINGLE_MONTH_INPUTS', updateSingleMonthInputs);
}

export default financialInputsSaga;
