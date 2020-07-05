import { fakeSuccess } from "./fakeActions";

function fakeUserInfo(userInfo, user) {
  return (dispatch) => {
    Object.keys(userInfo).forEach((key) => {
      user[key] = userInfo[key];
    });
    user = { ...user };
    dispatch(fakeSuccess(user));
  };
}

export default fakeUserInfo;
