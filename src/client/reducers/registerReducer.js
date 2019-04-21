import * as types from '../actions/actionType';

export default function (state = { isAuthenticated: false }, action) {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return { isAuthenticated: true };
    case types.REGISTER_USER_ERROR:
      return { isAuthenticated: false };
    default:
      return state;
  }
}
