import { combineReducers } from 'redux';
import user from './user';
import transfers from './transfer';

export default combineReducers({
  user,
  transfers,
});
