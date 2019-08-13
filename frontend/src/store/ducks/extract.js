import Immutable from 'seamless-immutable';

export const Types = {
  EXTRACT_REQUEST: 'user/EXTRACT_REQUEST',
  EXTRACT_SUCCESS: 'user/EXTRACT_SUCCESS',
  EXTRACT_FAILURE: 'user/EXTRACT_FAILURE',
};

// reducer
const INITIAL_STATE = Immutable({
  loading: false,
  data: [],
  error: null,
});

export default function extracts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.EXTRACT_REQUEST:
      return { ...state, loading: true };
    case Types.EXTRACT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };
    case Types.EXTRACT_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

// actions
export const Creators = {
  extractRequest: userId => ({
    type: Types.EXTRACT_REQUEST,
    payload: { userId },
  }),

  extractSuccess: data => ({
    type: Types.EXTRACT_SUCCESS,
    payload: { data },
  }),

  extractFailure: error => ({
    type: Types.EXTRACT_FAILURE,
    payload: { error },
  }),
};
