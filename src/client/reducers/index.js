import { combineReducers } from 'redux';
// import registerReducer from './registerReducer';
import authReducer from './authReducer';
// import checkTokenReducer from './checkTokenReducer';

const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;
