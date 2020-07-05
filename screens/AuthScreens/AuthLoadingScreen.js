import React, { Component } from "react";
import { View, AsyncStorage, Text } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import setUserAction from "../../Redux/actions/setUser";
import BG from "../../components/BG";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    console.log("çalıştım");
    const { navigate } = this.props.navigation;

    const userToken = AsyncStorage.getItem("honeymish_auth_token");
    const userId = AsyncStorage.getItem("honeymish_user_id");
    Promise.all([userToken, userId]).then(([userToken, userId]) => {
      if (userToken) {
        this.props.setUser(userToken, userId, navigate, false);
      } else {
        navigate("Login");
      }
    });
    // await AsyncStorage.clear();
  };
  render() {
    return (
      <BG>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Bacon-Normal",
              fontSize: 80,
              color: "#fff",
            }}
          >
            Loading
          </Text>
        </View>
      </BG>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    user: state.auth.user,
    pending: state.auth.pending,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setUser: setUserAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
