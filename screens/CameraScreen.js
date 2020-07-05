import React, { Component } from "react";
import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { Camera } from "expo-camera";

export default class CameraScreen extends Component {
  constructor() {
    super();
    this.state = {
      hasPermission: null,
    };
  }

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  };

  _takeAPhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate("Game", { photo });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera ref={(ref) => (this.camera = ref)} style={{ flex: 1 }} />
        <View
          style={{
            width: "80%",
            height: 60,
            position: "absolute",
            alignSelf: "center",
            bottom: 100,
          }}
        >
          <CustomButton
            name="Take a Photo"
            onPress={() => this._takeAPhoto()}
          />
          <View style={{ height: 10 }} />
          <CustomButton
            name="Cancel"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}
