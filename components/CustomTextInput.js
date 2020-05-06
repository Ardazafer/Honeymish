import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default class CustomTextInput extends Component {
  render() {
    return (
      <View style={s.mainContainer}>
        <Text style={s.titleTextStyle}>{this.props.title}</Text>
        <TextInput
          {...this.props}
          style={s.inputStyle}
          secureTextEntry={this.props.password}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  mainContainer: { width: "90%", height: 100, flexDirection: "column" },
  titleTextStyle: { fontWeight: "bold", fontSize: 20 },
  inputStyle: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
  },
});
