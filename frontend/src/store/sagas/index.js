import { all, takeEvery } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';

import { getUser, addUserContact, deleteUserContact } from './user';

export default function* rootSaga() {
  yield all([
    takeEvery(UserTypes.GET_USER_REQUEST, getUser),
    takeEvery(UserTypes.ADD_USER_CONTACT_REQUEST, addUserContact),
    takeEvery(UserTypes.DELETE_USER_CONTACT_REQUEST, deleteUserContact),
  ]);
}
