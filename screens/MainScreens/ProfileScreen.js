import React, { Component } from "react";
import { View, Text } from "react-native";
import BG from "../../components/BG";
import Header from "../../components/Header";
import ProfilePicture from "../../components/ProfilePicture";
import { MaterialIcons } from "@expo/vector-icons";
import TextCard from "../../components/TextCard";

export default class ProfileScreen extends Component {
  render() {
    return (
      <BG>
        <View style={s.container}>
          <Header
            back
            settings
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={s.mainContainer}>
            <ProfilePicture size={120} />
            <Text style={s.nameTextStyle}>Arda Zafer İbin</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="stars" size={30} color={"rgba(0,0,0,0.5)"} />
              <Text style={s.scoreTextStyle}>1205</Text>
            </View>
            <View style={s.statisticsContainer}>
              <TextCard title="Games Played" value="20" />
              <TextCard title="Games Won" value="4" />
              <TextCard title="Objects found" value="35" />
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
  nameTextStyle: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
  },
  scoreTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  statisticsContainer: {
    width: "100%",
    marginTop: 50,
  },
};
