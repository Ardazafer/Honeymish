import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default class CustomTextInput extends Component {
  render() {
    return (
      <View style={s.mainContainer}>
        <Text style={s.titleTextStyle}>{this.props.title}</Text>
        <TextInput
          {...this.props}
          style={[s.inputStyle, { fontSize: this.props.password ? 25 : 17 }]}
          secureTextEntry={this.props.password}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  mainContainer: { width: "90%", height: 100, flexDirection: "column" },
  titleTextStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgba(0,0,0,0.5)",
  },
  inputStyle: {
    backgroundColor: "rgba(255,255,255,0.8)",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    color: Colors.mainColor,
  },
});
