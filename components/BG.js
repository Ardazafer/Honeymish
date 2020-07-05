import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";

export default class BG extends Component {
  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ width: "100%", height: "100%", resizeMode: "cover" }}
        source={require("../assets/images/Background.png")}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}
