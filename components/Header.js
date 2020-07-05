import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class extends Component {
  render() {
    const { back, settings, score, edit, style } = this.props;
    return (
      <View style={[s.mainContainer, style]}>
        {back ? (
          <TouchableWithoutFeedback onPress={this.props.onBackPress}>
            <AntDesign name="left" size={35} color={"rgba(0,0,0,0.6)"} />
          </TouchableWithoutFeedback>
        ) : null}
        {settings ? (
          <Ionicons name="md-settings" size={40} color={"rgba(0,0,0,0.6)"} />
        ) : null}
        {/* {edit ? (
          <MaterialCommunityIcons
            name="account-edit"
            size={40}
            color={"rgba(0,0,0,0.6)"}
          />
        ) : null} */}
        {score === 0 || score ? (
          <View style={s.scoreContainerStyle}>
            <MaterialIcons name="stars" size={30} color={"rgba(0,0,0,0.5)"} />
            <Text style={s.scoreTextStyle}>{score}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const s = {
  mainContainer: {
    width: "90%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scoreTextStyle: {
    fontFamily: "ConcertOne-Regular",
    color: "#fff",
    fontSize: 30,
  },
  scoreContainerStyle: {
    width: "50%",
    flexDirection: "row",
  },
};
