import { authPending, authSuccess, authError } from "./authActions";

import honeymishAPI from "../../API/honeymishAPI";

function setUser(token, userId, navigate) {
  return (dispatch) => {
    dispatch(authPending());
    honeymishAPI
      .setUser(token, userId, navigate)
      .then((res) => {
        console.log("main e git artık", res);
        dispatch(authSuccess(res.user));
        navigate("Main");
      })
      .catch((error) => {
        console.log("setuser error", error);
        navigate("Login");
        dispatch(authError(error));
      });
  };
}
export default setUser;
