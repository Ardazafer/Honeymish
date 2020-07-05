import { authPending, authSuccess, authError } from "./authActions";
import showFlashMessage from "../../helpers/showFlashMessage";

import honeymishAPI from "../../API/honeymishAPI";

function loginUser(paramObj, navigate, setLoading) {
  return (dispatch) => {
    dispatch(authPending());
    honeymishAPI
      .login(paramObj, navigate)
      .then((res) => {
        setLoading(false);
        dispatch(authSuccess(res.user));
        navigate("Main");
      })
      .catch((error) => {
        showFlashMessage("Login Failed", error.response.data.message);
        dispatch(authError(error.response.data.message));
        setLoading(false);
      });
  };
}

export default loginUser;
