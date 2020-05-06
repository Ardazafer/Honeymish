import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class CustomButton extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        style={s.mainContainer}
        onPress={this.props.onPress}
      >
        <Text style={s.textStyle}>{this.props.name}</Text>
      </TouchableWithoutFeedback>
    );
  }
}

const s = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textStyle: {
    fontFamily: "ConcertOne-Regular",
    fontWeight: "500",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
});
