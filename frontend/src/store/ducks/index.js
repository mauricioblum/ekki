import { combineReducers } from 'redux';
import { reducer as user } from './user';

export default combineReducers({
  user,
});
