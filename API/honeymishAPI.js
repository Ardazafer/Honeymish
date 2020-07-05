import axios from "axios";
import objToFormData from "../helpers/objToFormData";
import { AsyncStorage } from "react-native";

const baseURL = "https://honeymish.oa.r.appspot.com";

const honeymishAPI = {
  honeymishAPI: axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  }), // will change in the production,

  /*
		Auth Routers
	*/

  async initialize(token) {
    if (!token) {
      try {
        token = await AsyncStorage.getItem("honeymish_auth_token");
      } catch (error) {
        // try later
      }
    }
    this.honeymishAPI.defaults.headers["Authorization"] = "Bearer " + token;
  },

  async setUser(token, userId, navigate, rememberMe) {
    rememberMe
      ? await AsyncStorage.multiSet([
          ["honeymish_auth_token", token],
          ["honeymish_user_id", userId],
        ])
      : null;
    this.initialize(token);
    return await this.getUser({
      targetId: userId,
    })
      .then((res) => {
        console.log(res);
        return { user: res.data.data.user };
      })
      .catch((err) => {
        console.log("Get User Error:", err);
        navigate("Login");
      });
  },

  async login(paramObj, navigate) {
    const authResponse = await this.honeymishAPI.post(
      "/api/users/login",
      paramObj
    );
    console.log(authResponse.data);
    return await this.setUser(
      authResponse.data.token,
      authResponse.data.data.user._id,
      navigate,
      true
    );
  },

  async logout(navigate) {
    AsyncStorage.multiRemove(
      ["honeymish_auth_token", "honeymish_user_id"],
      (err) => {}
    );
    navigate("Login");
  },

  signup(paramObj) {
    // paramObj consists of { firstName, lastName, email, password, passwordAgain  }
    return this.honeymishAPI.post("/api/users/signup", paramObj);
  },
  /*
		Helpers
	*/

  createQueryString(queryObj) {
    let string = "?";
    for (let param in queryObj) {
      string += param + "=" + queryObj[param] + "&";
    }
    return string;
  },

  getUser(paramObj) {
    // paramObj consists of what you want check more for documentation
    return this.honeymishAPI.get(
      "/api/users" + this.createQueryString(paramObj)
    );
  },
  editUser(formData) {
    // this is left blank intentionaly, fill it when you need it
    return this.honeymishAPI({
      method: "post",
      url: "/api/users/edit",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
  },

  updateMe(paramObj) {
    return this.honeymishAPI.patch("/api/users/updateMe", paramObj);
  },

  processImage(formData) {
    return this.honeymishAPI({
      method: "post",
      url: "/api/answers/processImage",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
  },

  sendImage(formData) {
    return this.honeymishAPI({
      method: "post",
      url: "/api/answers/sendImage",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
  },

  getQuestion() {
    return this.honeymishAPI.get("/api/questions/random");
  },
};

export default honeymishAPI;
