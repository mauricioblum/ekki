import { all, takeEvery } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';

import { getUser } from './user';

export default function* rootSaga() {
  yield all([takeEvery(UserTypes.GET_USER_REQUEST, getUser)]);
}
