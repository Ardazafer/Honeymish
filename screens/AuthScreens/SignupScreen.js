import * as React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import BG from "../../components/BG";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordAgain: "",
    };
  }

  login() {
    const { email, password } = this.state;
    console.log(email, password);
  }

  render() {
    return (
      <BG>
        <View style={s.container}>
          <View style={s.outerContainer}>
            <View style={s.logoContainer}></View>
            <CustomTextInput
              title="Username"
              onChangeText={(username) => {
                this.setState({ username });
              }}
              value={this.state.username}
            />
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
            <CustomTextInput
              password
              title="Password Again"
              onChangeText={(passwordAgain) => {
                this.setState({ passwordAgain });
              }}
              value={this.state.passwordAgain}
            />

            <View style={{ width: "90%", height: 50, marginTop: 20 }}>
              <CustomButton
                name="Signup"
                onPress={() => {
                  console.log("signup ");
                }}
              />
            </View>
          </View>
        </View>
      </BG>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
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
    backgroundColor: "white",
    marginBottom: 100,
  },
});
