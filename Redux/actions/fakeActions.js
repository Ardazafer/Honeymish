import { FAKE_SUCCESS } from "./types";

export function fakeSuccess(user) {
  return {
    type: FAKE_SUCCESS,
    payload: user,
  };
}
