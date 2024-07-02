import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/**
 * Get a single month's of financial inputs for a user
 */
function* getSingleMonthInputs(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/financial_inputs/${action.payload.month}&${action.payload.year}`,
    });
    yield put({
      type: "SET_SINGLE_MONTH_INPUTS",
      payload: response.data,
    });
  } catch (error) {}
}

/**
 * Get all the monthly inputs for a user
 */
function* getMonthlyInputs(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/financial_inputs`,
    });
    yield put({
      type: "SET_MONTHLY_INPUTS",
      payload: response.data,
    });
  } catch (error) {}
}

/**
 * Get all the MISSING monthly inputs for a user
 */
function* getMissingMonthlyInputs(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/financial_inputs/missing/`,
    });

    yield put({
      type: "SET_MISSING_MONTHLY_INPUTS",
      payload: response.data,
    });
  } catch (error) {}
}

/**
 * Get all the monthly inputs with INCOMPLETE RECOMMENDATION ACTIONS for a user
 */
function* getIncompleteRecsMonthlyInputs(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/financial_inputs/incomplete_recs/`,
    });

    yield put({
      type: "SET_INCOMPLETE_RECS_MONTHLY_INPUTS",
      payload: response.data,
    });
  } catch (error) {}
}

/**
 * Add a single month's inputs for a user
 */
function* addSingleMonthInputs(action) {
  try {
    const response = yield axios({
      method: "POST",
      url: `/api/financial_inputs`,
      data: action.payload,
    });
    yield put({ type: "GET_MONTHLY_INPUTS" });
  } catch (error) {}
}

/**
 * Update a single month's inputs for a user
 */
function* updateSingleMonthInputs(action) {
  try {
    const response = yield axios({
      method: "PUT",
      url: `/api/financial_inputs`,
      data: action.payload,
    });
    yield put({ type: "GET_MONTHLY_INPUTS" });
  } catch (error) {}
}

/**
 * Get the Latest month available for a user in the monthly_inputs file
 *    - used to load as a default in the financials page
 */
function* getLatestMonth(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/financial_inputs/latest_month`,
    });
    yield put({
      type: "SET_LATEST_MONTH",
      payload: response.data,
    });
  } catch (error) {}
}

function* financialInputsSaga() {
  yield takeLatest("GET_SINGLE_MONTH_INPUTS", getSingleMonthInputs);
  yield takeLatest("GET_MONTHLY_INPUTS", getMonthlyInputs);
  yield takeLatest("ADD_SINGLE_MONTH_INPUTS", addSingleMonthInputs);
  yield takeLatest("UPDATE_SINGLE_MONTH_INPUTS", updateSingleMonthInputs);
  yield takeLatest("GET_MISSING_MONTHLY_INPUTS", getMissingMonthlyInputs);
  yield takeLatest(
    "GET_INCOMPLETE_RECS_MONTHLY_INPUTS",
    getIncompleteRecsMonthlyInputs
  );
  yield takeLatest("GET_LATEST_MONTH", getLatestMonth);
}

export default financialInputsSaga;
