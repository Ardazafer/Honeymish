import React, { Component } from "react";
import { View, Text, Platform, ActivityIndicator } from "react-native";
import BG from "../../components/BG";
import Header from "../../components/Header";
import ProfilePicture from "../../components/ProfilePicture";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import TextCard from "../../components/TextCard";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import objToFormData from "../../helpers/objToFormData";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import honeymishAPI from "../../API/honeymishAPI";
import fakeProfilePicAction from "../../Redux/actions/fakeProfilePic";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";

import logoutUserAction from "../../Redux/actions/logoutUser";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      profilePicture: null,
    };
  }
  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  _pickImage = async () => {
    this.getPermissionAsync().then(async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        const profilePicture = result.uri;

        const formData = objToFormData({
          profilePic: {
            uri: profilePicture,
            type: "image/jpg",
            name: "pp.jpg",
          },
        });
        this.setState({ editPending: true });
        honeymishAPI
          .editUser(formData)
          .then((res) => {
            this.props.fakeProfilePic(res.data.profilePic, this.props.user);
            this.setState({
              profilePicture,
              editPending: false,
            });
          })
          .catch((err) => {
            console.log("başaramadım", err);
            this.setState({
              editPending: false,
            });
          });
      }
    });
  };

  _;
  render() {
    const {
      profilePic,
      name,
      practiceScore,
      gold,
      gamesPlayed,
      gamesWon,
      objectsFound,
    } = this.props.user;
    return (
      <BG>
        <View style={s.container}>
          <Header back onBackPress={() => this.props.navigation.goBack()} />
          <View style={s.mainContainer}>
            <View style={s.profilePictureContainer}>
              <ProfilePicture
                photo={this.state.profilePicture || profilePic}
                size={120}
              />
              {this.state.editPending ? (
                <View style={{ position: "absolute", top: 42, left: 42 }}>
                  <ActivityIndicator size="large" color={Colors.mainColor} />
                </View>
              ) : null}
              <View style={s.editProfileButton}>
                <TouchableWithoutFeedback
                  style={{ flex: 1 }}
                  onPress={this._pickImage}
                >
                  <Ionicons
                    name="ios-camera"
                    size={20}
                    color="rgba(0,0,0,0.7)"
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <Text style={s.nameTextStyle}>{name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <MaterialIcons
                  name="stars"
                  size={30}
                  color={"rgba(0,0,0,0.5)"}
                />
                <Text style={s.scoreTextStyle}>{practiceScore}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="coins"
                  size={25}
                  color={"rgba(0,0,0,0.5)"}
                />
                <Text style={s.scoreTextStyle}>{gold}</Text>
              </View>
            </View>
            <View style={s.statisticsContainer}>
              <TextCard title="Games Played" value={gamesPlayed} />
              <TextCard title="Games Won" value={gamesWon} />
              <TextCard title="Objects found" value={objectsFound} />
            </View>
            <View style={s.buttonContainer}>
              <CustomButton
                name="Log Out"
                onPress={() => {
                  this.props.logoutUser(this.props.navigation.navigate);
                }}
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
  buttonContainer: {
    marginTop: 200,
    width: "100%",
    height: 60,
  },
  editProfileButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fakeProfilePic: fakeProfilePicAction,
      logoutUser: logoutUserAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
