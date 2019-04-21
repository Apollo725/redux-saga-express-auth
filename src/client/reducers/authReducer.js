import * as types from '../actions/actionType';

const initialState = { email: '', isAuthenticated: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      console.log('reducer', action.payload);
      return { ...state, email: action.payload.email, isAuthenticated: true };
    case types.LOGIN_USER_ERROR:
      console.log('login reducer error', action.payload);
      return action.payload;
    case types.REGISTER_USER_SUCCESS:
      return { ...state, isAuthenticated: true };
    case types.REGISTER_USER_ERROR:
      return { ...state, isAuthenticated: false };
    case types.LOGOUT:
      return { ...state, email: '', isAuthenticated: false };
    case types.CHECK_TOKEN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case types.CHECK_TOKEN_ERROR:
      return { ...state, isAuthenticated: false };
    case types.TOKEN_AVAILABLE:
      return { ...state, isAuthenticated: true };
    case types.TOKEN_NOT_AVAILABLE:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}
