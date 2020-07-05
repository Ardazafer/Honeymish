import { logOutUser } from "./authActions";
import honeymishAPI from "../../API/honeymishAPI";
import showFlashMessage from "../../helpers/showFlashMessage";

function logoutUser(navigate, banned) {
  return (dispatch) => {
    honeymishAPI.logout(navigate).then((res) => {
      dispatch(logOutUser());
      if (banned) {
        showFlashMessage("You are banned!", `Reason: ${banned.reason}`);
      } else {
        showFlashMessage(
          "Log out successfull!",
          "You have successfully logged out."
        );
      }
    });
  };
}

export default logoutUser;
