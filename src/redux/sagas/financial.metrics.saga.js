import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


/**
 * Get a single month's of financial inputs for a user
 */
function* getSingleMonthMetrics(action) {

  try {
    console.log('in get here is action.payload', action.payload)
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_metrics/${action.payload.month}&${action.payload.year}`,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true })
    console.log('did get, here is reposnse: ', response.data);
    yield put({
        type: 'SET_SINGLE_MONTH_METRICS',
        payload: response.data })
  } catch (error) {
    console.log('Error while getting single month\'s metrics:', error);
  }
}

/**
 * Get all the monthly metrics for a user
 */
function* getMonthlyMetrics(action) {
    try {
      const response = yield axios({
          method: 'GET',
          url: `/api/financial_metrics`})
      yield put({
          type: 'SET_MONTHLY_METRICS',
          payload: response.data })
    } catch (error) {
      console.log('Error while getting monthly metrics:', error);
    }
  }

/**
 * Get all the monthly metrics and industry data for a user
 */
function* getMonthlyGraphData(action) {
  try {
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_metrics/graph_data`})
    yield put({
        type: 'SET_MONTHLY_GRAPH_DATA',
        payload: response.data })
  } catch (error) {
    console.log('Error while getting monthly graph data:', error);
  }
}

  /**
 * Get a single month's in variances
 */
function* getSingleMonthVariances(action) {

  try {
    console.log('in get here is action.payload', action.payload)
    const response = yield axios({
        method: 'GET',
        url: `/api/financial_metrics/summary/${action.payload.month}&${action.payload.year}`,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true })
    console.log('did get, here is reposnse: ', response.data);
    yield put({
        type: 'SET_SINGLE_MONTH_VARIANCES',
        payload: response.data })
  } catch (error) {
    console.log('Error while getting single month\'s variances:', error);
  }
}

/**
 * Toggle the completed date on or off for a metric (when checkbox clilcked)
 */
function* toggleMetricCompleted(action) {
    try {
      const response = yield axios({
          method: 'PATCH',
          url: `/api/financial_metrics/toggle_completed/${action.payload.metricId}`,
          data: { month: action.payload.month, 
                  year: action.payload.year } })
      console.log('after patch toggle response.data',response.data)
      yield put({
          type: 'GET_SINGLE_MONTH_METRICS',
          payload: { month: action.payload.month, 
                     year: action.payload.year } })
    } catch (error) {
      console.log('Error while toggling completed date for a metric:', error);
    }
  }

  /**
 * Toggle the completed date on or off for a metric (when checkbox clilcked)
 */
function* updateMetricNotes(action) {
    try {
      const response = yield axios({
          method: 'PATCH',
          url: `/api/financial_metrics/update_notes/${action.payload.metricId}`,
          data: { month: action.payload.month, 
                  year: action.payload.year,
                  notes: action.payload.notes } })
      yield put({
          type: 'GET_SINGLE_MONTH_METRICS',
          payload: { month: action.payload.month, 
            year: action.payload.year } })
    } catch (error) {
      console.log('Error while toggling completed date for a metric:', error);
    }
  }

function* financialMetricsSaga() {
  yield takeLatest('GET_SINGLE_MONTH_METRICS', getSingleMonthMetrics);
  yield takeLatest('GET_MONTHLY_METRICS', getMonthlyMetrics);
  yield takeLatest('TOGGLE_METRIC_COMPLETED', toggleMetricCompleted);
  yield takeLatest('UPDATE_METRIC_NOTES', updateMetricNotes);
  yield takeLatest('GET_SINGLE_MONTH_VARIANCES',getSingleMonthVariances);
  yield takeLatest('GET_MONTHLY_GRAPH_DATA', getMonthlyGraphData);
}

export default financialMetricsSaga;

