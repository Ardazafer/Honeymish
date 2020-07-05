import {
  AUTH_SUCCESS,
  AUTH_PENDING,
  AUTH_ERROR,
  LOG_OUT_USER,
} from "../actions/types";

export function authPending() {
  return {
    type: AUTH_PENDING,
  };
}

export function authSuccess(user) {
  return {
    type: AUTH_SUCCESS,
    payload: user,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function logOutUser() {
  return {
    type: LOG_OUT_USER,
  };
}
