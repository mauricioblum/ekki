import Immutable from 'seamless-immutable';

export const Types = {
  GET_USER_REQUEST: 'user/GET_USER_REQUEST',
  GET_USER_SUCCESS: 'user/GET_USER_SUCCESS',
  GET_USER_FAILURE: 'user/GET_USER_FAILURE',
  ADD_USER_CONTACT_REQUEST: 'user/ADD_USER_CONTACT_REQUEST',
  ADD_USER_CONTACT_SUCCESS: 'user/ADD_USER_CONTACT_SUCCESS',
  ADD_USER_CONTACT_FAILURE: 'user/ADD_USER_CONTACT_FAILURE',
  DELETE_USER_CONTACT_REQUEST: 'user/DELETE_USER_CONTACT_REQUEST',
  DELETE_USER_CONTACT_SUCCESS: 'user/DELETE_USER_CONTACT_SUCCESS',
  DELETE_USER_CONTACT_FAILURE: 'user/DELETE_USER_CONTACT_FAILURE',
};

// reducer
const INITIAL_STATE = Immutable({
  loading: false,
  data: [],
  error: null,
});

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USER_REQUEST:
      return { ...state, loading: true };
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };
    case Types.GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.ADD_USER_CONTACT_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_USER_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
};
    case Types.ADD_USER_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case Types.DELETE_USER_CONTACT_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_USER_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data],
      };
    case Types.DELETE_USER_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

// actions
export const Creators = {
  getUserRequest: (cpf, history) => ({
    type: Types.GET_USER_REQUEST,
    payload: { cpf, history },
  }),

  getUserSuccess: data => ({
    type: Types.GET_USER_SUCCESS,
    payload: { data },
  }),

  getUserFailure: error => ({
    type: Types.GET_USER_FAILURE,
    payload: { error },
  }),
  addUserContactRequest: (cpf, name) => ({
    type: Types.ADD_USER_CONTACT_REQUEST,
    payload: { cpf, name },
  }),

  addUserContactSuccess: data => ({
    type: Types.ADD_USER_CONTACT_SUCCESS,
    payload: { data },
  }),

  addUserContactFailure: error => ({
    type: Types.ADD_USER_CONTACT_FAILURE,
    payload: { error },
  }),
  deleteUserContactRequest: id => ({
    type: Types.DELETE_USER_CONTACT_REQUEST,
    payload: { id },
  }),

  deleteUserContactSuccess: data => ({
    type: Types.DELETE_USER_CONTACT_SUCCESS,
    payload: { data },
  }),

  deleteUserContactFailure: error => ({
    type: Types.DELETE_USER_CONTACT_FAILURE,
    payload: { error },
  }),
};
