import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as UserActions } from '../ducks/user';

export function* getUser(action) {
  try {
    const user = yield call(api.get, `/users?cpf=${action.cpf}`);
    yield put(UserActions.getUserSuccess(user.data[0]));
    action.history.push(`/user`);
  } catch (err) {
    yield put(UserActions.getUserFailure('Erro ao capturar dados do usuário!'));
  }
}
