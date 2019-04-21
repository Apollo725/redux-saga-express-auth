import { takeLatest } from 'redux-saga/effects';
import {
  registerSaga, loginSaga, checkTokenSaga,
} from './authenticationSaga';

import * as types from '../actions/actionType';

export default function* watchUserAuthentication() {
  yield takeLatest(types.REGISTER_USER, registerSaga);

  yield takeLatest(types.LOGIN_USER, loginSaga);

  yield takeLatest(types.CHECK_TOKEN, checkTokenSaga);
}
