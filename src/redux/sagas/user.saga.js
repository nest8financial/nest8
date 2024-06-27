import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and email set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateUser(action) {
  console.log(action.payload)
  try {
    yield axios ({
      method:'PUT',
      url: '/api/user',
      data: action.payload
    }) 
    yield put ({ type:'FETCH_USER'})
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateProductSelected(action) {
  console.log('updateing the selected product:', action.payload)
  try {
    yield axios ({
      method:'PATCH',
      url: '/api/user/update_product',
      data: action.payload
    }) 
    console.log('ok, about to fetch user::::')
    yield put ({ type:'FETCH_USER'})
  } catch (error) {
    console.log('Update of user product failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUser);
  yield takeLatest('UPDATE_PRODUCT_SELECTED', updateProductSelected);
}

export default userSaga;
