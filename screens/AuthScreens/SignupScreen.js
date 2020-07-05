import * as React from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import BG from "../../components/BG";
import Header from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import honeymishAPI from "../../API/honeymishAPI";
import showFlashMessage from "../../helpers/showFlashMessage";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      signupInfo: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      pending: false,
    };
  }

  handleSignup(paramObj) {
    Keyboard.dismiss();
    this.setState({ pending: true });
    Object.keys(paramObj).forEach((key) => {
      const currentParam = paramObj[key];
      paramObj[key] = currentParam.trim();
    });
    this.setState({ signupInfo: paramObj });
    console.log(paramObj);

    honeymishAPI
      .signup(paramObj)
      .then((res) => {
        this.setState({ pending: false });
        this.props.navigation.navigate("Login");
      })
      .catch((err) => {
        this.setState({ pending: false });

        const errors = err.response.data.message;
        const firstErrorKey = Object.keys(errors)[0];
        const currentError = errors[firstErrorKey];
        showFlashMessage("Signup Failed!", currentError.message);
      });
  }

  render() {
    const { signupInfo } = this.state;
    return (
      <ScrollView style={{ backgroundColor: Colors.mainColor }}>
        <BG>
          <View style={s.container}>
            <Header
              style={{ position: "absolute", top: 50 }}
              back
              onBackPress={() => this.props.navigation.goBack()}
            />
            <View style={s.outerContainer}>
              <View style={s.logoContainer}>
                <Text style={s.logoTextStyle}>Honeymish</Text>
              </View>
              <CustomTextInput
                title="First Name"
                onChangeText={(firstName) => {
                  this.setState({
                    signupInfo: {
                      ...signupInfo,
                      firstName,
                    },
                  });
                }}
                value={this.state.signupInfo.firstName}
              />
              <CustomTextInput
                title="Last Name"
                onChangeText={(lastName) => {
                  this.setState({
                    signupInfo: {
                      ...signupInfo,
                      lastName,
                    },
                  });
                }}
                value={this.state.signupInfo.lastName}
              />
              <CustomTextInput
                title="Email"
                onChangeText={(email) => {
                  this.setState({
                    signupInfo: {
                      ...signupInfo,
                      email,
                    },
                  });
                }}
                value={this.state.signupInfo.email}
              />
              <CustomTextInput
                password
                title="Password"
                onChangeText={(password) => {
                  this.setState({
                    signupInfo: {
                      ...signupInfo,
                      password,
                    },
                  });
                }}
                value={this.state.signupInfo.password}
              />
              <CustomTextInput
                password
                title="Password Again"
                onChangeText={(passwordConfirm) => {
                  this.setState({
                    signupInfo: {
                      ...signupInfo,
                      passwordConfirm,
                    },
                  });
                }}
                value={this.state.signupInfo.passwordConfirm}
              />

              <View style={{ width: "90%", height: 50, marginTop: 20 }}>
                <CustomButton
                  loading={this.state.pending}
                  name="Signup"
                  onPress={() => {
                    this.handleSignup(this.state.signupInfo);
                  }}
                />
              </View>
            </View>
          </View>
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
    marginTop: 85,
  },
  logoContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  logoTextStyle: {
    fontFamily: "Bacon-Normal",
    fontSize: 70,
    color: "#fff",
  },
});
