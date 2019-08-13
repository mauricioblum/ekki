import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import {
  showSuccessToast,
  showErrorToast,
} from '../../services/NotificationService';

import { Creators as UserActions } from '../ducks/user';

export function* loadUser(action) {
  try {
    const user = yield call(api.get, `/users/${action.id}`);
    yield put(UserActions.getUserSuccess(user.data[0]));
    action.history.push(`/user`);
  } catch (err) {
    yield put(UserActions.getUserFailure('Erro ao capturar dados do usuário!'));
  }
}

export function* getUser(action) {
  try {
    const user = yield call(api.get, `/users?cpf=${action.cpf}`);
    yield put(UserActions.getUserSuccess(user.data[0]));
    action.history.push(`/user`);
  } catch (err) {
    yield put(UserActions.getUserFailure('Erro ao capturar dados do usuário!'));
  }
}

export function* addUserContact(action) {
  const getUserState = state => state.user.data;

  const user = yield select(getUserState);
  try {
    if (action.name !== '') {
      yield call(
        api.post,
        `/users/${user.id}/contacts/add?name=${action.name}`
      );
    } else {
      yield call(api.post, `/users/${user.id}/contacts/add?cpf=${action.cpf}`);
    }

    const userAction = {
      cpf: user.cpf,
    };
    yield getUser(userAction);
    showSuccessToast('Contato adicionado com sucesso!');
    yield put(UserActions.addUserContactSuccess());
  } catch (err) {
    showErrorToast(`Erro: ${err.response.data.error.message}`);
    yield put(
      UserActions.addUserContactFailure('Erro ao adicionar o contato!')
    );
  }
}

export function* deleteUserContact(action) {
  const getUserState = state => state.user.data;

  const user = yield select(getUserState);
  try {
    yield call(api.delete, `/users/${user.id}/contacts/${action.id}`);

    const userAction = {
      cpf: user.cpf,
    };
    yield getUser(userAction);
    showErrorToast('Contato removido com sucesso!');
    yield put(UserActions.deleteUserContactSuccess());
  } catch (err) {
    showErrorToast(`Erro: ${err.response.data.error.message}`);
    yield put(
      UserActions.deleteUserContactFailure('Erro ao remover o contato!')
    );
  }
}
