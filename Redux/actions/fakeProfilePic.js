import { fakeSuccess } from "./fakeActions";

function fakeProfilePic(profilePic, user) {
  console.log(user, profilePic);
  return (dispatch) => {
    user.profilePic = profilePic;
    user = { ...user };
    console.log("last", user);
    dispatch(fakeSuccess(user));
  };
}

export default fakeProfilePic;
