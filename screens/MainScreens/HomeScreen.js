import React, { Component } from "react";
import { Text, View, BackHandler, StyleSheet } from "react-native";
import BG from "../../components/BG";
import ProfilePicture from "../../components/ProfilePicture";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class HomeScreen extends Component {
  /** 
   * TODO: Fix This!!
   * 
   * componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    return true;
  }; */

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <BG>
        <View style={s.container}>
          <View style={s.mainContainer}>
            <View style={s.logoContainer}></View>
            <View style={s.playerInfoContainer}>
              <View style={s.leftContainer}>
                <TouchableWithoutFeedback
                  onPress={() => navigate("Profile", {})}
                >
                  <ProfilePicture size={80} />
                </TouchableWithoutFeedback>
              </View>
              <View style={s.rightContainer}>
                <Text style={s.nameTextStyle}>Arda Zafer İbin</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="stars"
                    size={30}
                    color={"rgba(0,0,0,0.5)"}
                  />
                  <Text style={s.scoreTextStyle}>1205</Text>
                </View>
              </View>
            </View>
            <View style={s.buttonContainer}>
              <CustomButton
                name="Play Now!"
                onPress={() => navigate("Search")}
              />
            </View>
            <View style={s.buttonContainer}>
              <CustomButton
                name="Play Offline"
                onPress={() => navigate("Game", { online: false })}
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
    backgroundColor: "white",
    marginBottom: 100,
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
