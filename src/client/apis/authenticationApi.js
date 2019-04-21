import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as urls from '../config/urls';
import setAuthToken from '../utils/setAuthToken';

// POST /api/auth/register
export const registerUserApi = (request) => {
  const { REGISTER_API_ENDPOINT } = urls;
  // const parameters = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(request.payload)
  // };
  const response = axios.post(REGISTER_API_ENDPOINT, request.payload)
    .then(res => res.data)
    .then(json => json);
  return response;
};

// POST /api/auth/login
export const loginUserApi = (request) => {
  console.log('login API', request);
  const { LOGIN_API_ENDPOINT } = urls;
  // const parameters = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(request.loginData)
  // };
  const response = axios.post(LOGIN_API_ENDPOINT, request.payload)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      return decoded;
    })
    .then(json => json);
  return response;
};

export const checkTokenApi = () => {
  console.log('checkToken API');
  const { CHECK_TOKEN_API_ENDPOINT } = urls;
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(CHECK_TOKEN_API_ENDPOINT, parameters)
    .then(response => response.status)
    .then(json => json);
};
