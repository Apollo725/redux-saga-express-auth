import { put, call } from 'redux-saga/effects';
import {
  userRegisterSuccess,
  userRegisterError,
  userLoginSuccess,
  userLoginError,
  checkTokenSuccess,
  checkTokenError
} from '../actions/authActions';
import { registerUserApi, loginUserApi, checkTokenApi } from '../apis/authenticationApi';

export function* registerSaga(payload) {
  try {
    const response = yield call(registerUserApi, payload);
    console.log('register response from API', response);
    yield put(userRegisterSuccess(response));
  } catch (error) {
    yield put(userRegisterError(error.response.data));
  }
}

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserApi, payload);
    console.log('login response from API', response);
    yield put(userLoginSuccess(response));
  } catch (error) {
    console.log('login response error rom API', error.response.data);
    yield put(userLoginError(error.response.data));
  }
}

export function* checkTokenSaga() {
  try {
    const response = yield call(checkTokenApi);
    console.log('checkToken response from API', response);
    if (response === 200) {
      yield put(checkTokenSuccess(response));
    } else {
      yield put(checkTokenError(response));
    }
  } catch (error) {
    yield put(checkTokenError(error));
  }
}
