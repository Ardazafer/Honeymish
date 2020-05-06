import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class TextCard extends Component {
  render() {
    return (
      <View style={s.mainContainer}>
        <Text
          style={s.textStyle}
        >{`${this.props.title} : ${this.props.value}`}</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 60,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textStyle: {
    fontFamily: "ConcertOne-Regular",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
});
