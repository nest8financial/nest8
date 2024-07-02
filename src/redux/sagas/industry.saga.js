import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "fetchIndustry" actions
function* fetchIndustries() {
  try {
    const response = yield axios.get("/api/industry");

    yield put({ type: "SET_INDUSTRY", payload: response.data });
  } catch (error) {}
}

function* industrySaga() {
  yield takeLatest("FETCH_INDUSTRIES", fetchIndustries);
}

export default industrySaga;
