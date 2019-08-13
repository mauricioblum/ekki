import Immutable from 'seamless-immutable';

export const Types = {
  TRANSFER_REQUEST: 'user/TRANSFER_REQUEST',
  TRANSFER_SUCCESS: 'user/TRANSFER_SUCCESS',
  TRANSFER_FAILURE: 'user/TRANSFER_FAILURE',
};

// reducer
const INITIAL_STATE = Immutable({
  loading: false,
  data: [],
  error: null,
});

export default function transfers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.TRANSFER_REQUEST:
      return { ...state, loading: true };
    case Types.TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };
    case Types.TRANSFER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

// actions
export const Creators = {
  transferRequest: (id, amount, history) => ({
    type: Types.TRANSFER_REQUEST,
    payload: { id, amount, history },
  }),

  transferSuccess: data => ({
    type: Types.TRANSFER_SUCCESS,
    payload: { data },
  }),

  transferFailure: error => ({
    type: Types.TRANSFER_FAILURE,
    payload: { error },
  }),
};
