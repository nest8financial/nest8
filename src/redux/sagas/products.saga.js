import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchProducts() {
  try {
    const response = yield axios.get("/api/products");

    yield put({ type: "SET_PRODUCTS", payload: response.data });
  } catch (error) {}
}

// function* fetchNewProductSelected() {
//     try {
//       const response = yield axios.get("/api/products");

//       console.log("product saga fetch:", response.data);

//       yield put({ type: "SET_NEW_PRODUCT_SELECTED", payload: response.data });
//     } catch (error) {
//       console.log("product get request failed", error);
//     }
//   }

function* productsSaga() {
  yield takeLatest("FETCH_PRODUCTS", fetchProducts);
}

export default productsSaga;
