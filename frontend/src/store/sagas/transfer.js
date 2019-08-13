import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import {
  showSuccessToast,
  showErrorToast,
} from '../../services/NotificationService';

import { Creators as TransferActions } from '../ducks/transfer';
import { Types as UserTypes } from '../ducks/user';

export function* makeTransfer(action) {
  const getUserState = state => state.user.data;

  const user = yield select(getUserState);
  try {
    const transfer = yield call(
      api.post,
      `/users/${user.id}/transfer/${action.id}`,
      {
        amount: action.amount,
      }
    );
    yield put(TransferActions.transferSuccess(transfer.data));
    yield put({ type: UserTypes.LOAD_USER_DATA, id: user.id });
    showSuccessToast('Transferencia concluida com sucesso!');
    // action.history.push('/user');
  } catch (err) {
    showErrorToast(`Erro! ${err.data.error.message}`);
    yield put(TransferActions.transferFailure('Erro ao transferir!'));
  }
}
