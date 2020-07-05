import * as React from "react";
import { StyleSheet, View, Text, BackHandler } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import BG from "../../components/BG";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginUserAction from "../../Redux/actions/loginUser";
import { ScrollView } from "react-native-gesture-handler";

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "zafer.ibin@bilgiedu.net",
      password: "Ardazafer123",
      loading: false,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    return true;
  };
  setLoading(loading) {
    this.setState({ loading });
  }

  login() {
    const { email, password } = this.state;
    this.setState({ loading: true });

    this.props.loginUser(
      { email, password },
      this.props.navigation.navigate,
      this.setLoading.bind(this)
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.mainColor }}>
        <BG>
          <View style={s.container}>
            <View style={s.outerContainer}>
              <View style={s.logoContainer}>
                <Text style={s.logoTextStyle}>Honeymish</Text>
              </View>
              <CustomTextInput
                title="Email"
                onChangeText={(email) => {
                  this.setState({ email });
                }}
                value={this.state.email}
              />
              <CustomTextInput
                password
                title="Password"
                onChangeText={(password) => {
                  this.setState({ password });
                }}
                value={this.state.password}
              />
              <View style={{ width: "90%", height: 50, marginBottom: 20 }}>
                <CustomButton
                  loading={this.state.loading}
                  name="Login"
                  onPress={() => this.login()}
                />
              </View>
              <View style={{ width: "90%", height: 50 }}>
                <CustomButton
                  name="Signup"
                  onPress={() => {
                    this.props.navigation.navigate("Signup", {});
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ height: 230 }}></View>
        </BG>
      </ScrollView>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    alignItems: "center",
    width: "80%",
    height: "80%",
  },
  logoContainer: {
    width: "100%",
    height: 200,
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logoTextStyle: {
    fontFamily: "Bacon-Normal",
    fontSize: 70,
    color: "#fff",
  },
});

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    pending: state.auth.pending,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUser: loginUserAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
