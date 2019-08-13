import { combineReducers } from 'redux';
import user from './user';
import transfers from './transfer';
import extracts from './extract';

export default combineReducers({
  user,
  transfers,
  extracts,
});
