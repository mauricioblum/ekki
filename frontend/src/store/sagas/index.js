import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';
import { Types as TransferTypes } from '../ducks/transfer';

import { getUser, addUserContact, deleteUserContact, loadUser } from './user';
import { makeTransfer } from './transfer';

export default function* rootSaga() {
  yield all([
    takeEvery(UserTypes.LOAD_USER_DATA, loadUser),
    takeEvery(UserTypes.GET_USER_REQUEST, getUser),
    takeEvery(UserTypes.ADD_USER_CONTACT_REQUEST, addUserContact),
    takeEvery(UserTypes.DELETE_USER_CONTACT_REQUEST, deleteUserContact),
    takeLatest(TransferTypes.TRANSFER_REQUEST, makeTransfer),
  ]);
}
