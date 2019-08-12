import Immutable from 'seamless-immutable';

export const Types = {
  GET_USER_REQUEST: 'user/GET_USER_REQUEST',
  GET_USER_SUCCESS: 'user/GET_USER_SUCCESS',
  GET_USER_FAILURE: 'user/GET_USER_FAILURE',
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
        data: [...state.data, action.payload.data],
      };
    case Types.GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

// actions
export const Creators = {
  getUserRequest: () => ({
    type: Types.GET_USER_REQUEST,
  }),

  getUserSuccess: data => ({
    type: Types.GET_USER_SUCCESS,
    payload: { data },
  }),

  getUserFailure: error => ({
    type: Types.GET_USER_FAILURE,
    payload: { error },
  }),
};
