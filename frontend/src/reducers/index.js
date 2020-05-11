import { combineReducers } from 'redux';
import common from './common.reducer';
import auth from './auth.reducer';
import createClass from './createClass.reducer';

const rootReducer = combineReducers({
  common,
  auth,
  createClass
});

export default rootReducer;
