import { combineReducers } from 'redux';
import common from './common.reducer';
import auth from './auth.reducer';
import createClass from './createClass.reducer';
import classes from './class.reducer';

const rootReducer = combineReducers({
  common,
  auth,
  createClass,
  classes
});

export default rootReducer;
