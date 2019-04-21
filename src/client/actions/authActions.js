import * as types from './actionType';
import setAuthToken from '../utils/setAuthToken';

// User Registration Action
export const registerUserAction = userData => ({
  type: types.REGISTER_USER,
  payload: userData
});

export const userRegisterSuccess = response => ({
  type: types.REGISTER_USER_SUCCESS,
  payload: response
});

export const userRegisterError = error => ({
  type: types.REGISTER_USER_ERROR,
  error
});

// User Login Action
export const loginUserAction = loginData => ({
  type: types.LOGIN_USER,
  payload: loginData
});

export const userLoginSuccess = response => ({
  type: types.LOGIN_USER_SUCCESS,
  payload: response
});

export const userLoginError = error => ({
  type: types.LOGIN_USER_ERROR,
  payload: error
});

// User logout Action
export const logoutAction = (history) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  history.push('/login');
  return {
    type: types.LOGOUT
  };
};

// check token is available
export const checkToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return {
      type: types.TOKEN_AVAILABLE
    };
  }
  return {
    type: types.TOKEN_NOT_AVAILABLE
  };
};

export const checkTokenSuccess = response => ({
  type: types.CHECK_TOKEN_SUCCESS,
  response
});

export const checkTokenError = error => ({
  type: types.CHECK_TOKEN_ERROR,
  error
});
