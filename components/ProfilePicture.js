import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export default class ProfilePicture extends Component {
  constructor() {
    super();
    this.state = {
      offsetY: 0,
    };
  }
  componentDidMount() {
    if (this.props.searching) {
      this.rollImage();
    }
  }

  rollImage() {
    if (this.props.searching) {
      setTimeout(() => {
        if (this.state.offsetY < -1190) {
          this.setState({ offsetY: 0 });
        }
        this.setState((state) => ({ offsetY: state.offsetY - 20 }));
        this.rollImage();
      }, 10);
    }
  }

  render() {
    const {
      size,
      borderColor,
      name,
      searching,
      fullName,
      photo,
      noBorder,
    } = this.props;
    let shortName;
    if (name) {
      const nameArray = name.split(" ");
      nameArray.pop();
      shortName = nameArray.join(" ");
    }

    const pp =
      "data:image/jpeg;base64,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";
    return (
      <View style={s.container}>
        <View
          style={[
            s.mainContainer,
            {
              borderWidth: noBorder ? 0 : fullName ? 3 : 2,
              borderColor: borderColor ? borderColor : "#fff",
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          {searching ? (
            <Image
              style={{
                width: "100%",
                transform: [{ translateY: this.state.offsetY }],
              }}
              source={require("../assets/images/profilePictures.png")}
            />
          ) : (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: photo || pp }}
            />
          )}
        </View>
        {name ? (
          <View style={s.nameContainer}>
            <Text
              style={[
                s.nameTextStyle,
                fullName
                  ? { fontSize: 20, height: 60 }
                  : {
                      width: 70,
                      fontSize: 15,
                    },
              ]}
            >
              {shortName}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const s = {
  mainContainer: {
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
  },
  nameTextStyle: {
    fontFamily: "ConcertOne-Regular",
    fontSize: 15,
    alignSelf: "center",
    color: "#fff",
    textAlign: "center",
  },
};
