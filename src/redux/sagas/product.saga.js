import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";


function* fetchProducts() {
  try {
    const response = yield axios.get("/api/products");
    
    console.log("product saga fetch:", response.data);

    yield put({ type: "SET_PRODUCTS", payload: response.data });
  } catch (error) {
    console.log("product get request failed", error);
  }
}

function* fetchNewProductSelected() {
    try {
      const response = yield axios.get("/api/products");
      
      console.log("product saga fetch:", response.data);
  
      yield put({ type: "SET_PRODUCTS", payload: response.data });
    } catch (error) {
      console.log("product get request failed", error);
    }
  }

function* productSaga() {
  yield takeLatest("FETCH_PRODUCTS", fetchProducts);
  yield takeLatest("FETCH_NEW_PRODUCT_SELECTED", fetchNewProductSelected);
}

export default productSaga;
