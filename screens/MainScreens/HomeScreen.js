import React, { Component } from "react";
import { Text, View, BackHandler, StyleSheet } from "react-native";
import BG from "../../components/BG";
import ProfilePicture from "../../components/ProfilePicture";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { connect } from "react-redux";

class HomeScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    return true;
  };
  render() {
    const { profilePic, name, practiceScore, gold } = this.props.user;
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <BG>
        <View style={s.container}>
          <View style={s.mainContainer}>
            <View style={s.logoContainer}>
              <Text style={s.logoTextStyle}>Honeymish</Text>
            </View>
            <TouchableWithoutFeedback
              style={s.playerInfoContainer}
              onPress={() => {
                navigate("Profile", {});
              }}
            >
              <View style={s.leftContainer}>
                <ProfilePicture photo={profilePic} size={80} />
              </View>
              <View style={s.rightContainer}>
                <Text style={s.nameTextStyle}>{name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  >
                    <MaterialIcons
                      name="stars"
                      size={30}
                      color={"rgba(0,0,0,0.5)"}
                    />
                    <Text style={s.scoreTextStyle}>{practiceScore}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5
                      name="coins"
                      size={25}
                      color={"rgba(0,0,0,0.5)"}
                    />
                    <Text style={s.scoreTextStyle}>{gold}</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={s.buttonContainer}>
              <CustomButton
                name="Play Now!"
                onPress={() => {
                  navigate("Search");
                }}
              />
            </View>
            <View style={s.buttonContainer}>
              <CustomButton
                name="Play Offline"
                onPress={() => {
                  navigate("Game", { online: false });
                }}
              />
            </View>
          </View>
        </View>
      </BG>
    );
  }
}

const s = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
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
  playerInfoContainer: {
    height: 120,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
  },
  scoreTextStyle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  nameTextStyle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 2,
    justifyContent: "center",
    marginLeft: 10,
  },
  buttonContainer: {
    width: "100%",
    height: 60,
    marginTop: 30,
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(HomeScreen);
