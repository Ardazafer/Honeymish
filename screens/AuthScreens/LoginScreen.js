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
      email: "",
      password: "",
    };
  }

  login() {
    const { email, password } = this.state;
    console.log(email, password);
    this.props.navigation.navigate("Main", {});
  }

  render() {
    return (
      <BG>
        <View style={s.container}>
          <View style={s.outerContainer}>
            <View style={s.logoContainer}></View>
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
              <CustomButton name="Login" onPress={() => this.login()} />
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
