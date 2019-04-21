import * as types from '../actions/actionType';

export default function (state = { isAuthenticated: false }, action) {
  const { response } = action;
  switch (action.type) {
    case types.CHECK_TOKEN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case types.CHECK_TOKEN_ERROR:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}
