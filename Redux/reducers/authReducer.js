import {
  AUTH_SUCCESS,
  AUTH_PENDING,
  AUTH_ERROR,
  LOG_OUT_USER,
  FAKE_SUCCESS,
} from "../actions/types";

const initialState = {
  pending: false,
  error: null,
  user: {},
};

export function authReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case AUTH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        pending: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        user: {},
      };
    case FAKE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
