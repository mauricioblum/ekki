import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as ExtractActions } from '../ducks/extract';
import { Types as UserTypes } from '../ducks/user';

export function* getExtracts(action) {
  try {
    const extracts = yield call(api.get, `/users/${action.userId}/transfers/`);
    yield put(ExtractActions.extractSuccess(extracts.data));
    yield put({ type: UserTypes.LOAD_USER_DATA, id: action.userId });
  } catch (err) {
    yield put(
      ExtractActions.extractFailure(`Erro! ${err.response.data.error.message}`)
    );
  }
}
