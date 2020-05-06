import React, { Component } from "react";
import { Text, View } from "react-native";
import ProfilePicture from "../components/ProfilePicture";
import BG from "../components/BG";
import Colors from "../constants/Colors";
import Header from "../components/Header";

export default class PlayerSearchScreen extends Component {
  constructor() {
    super();
    this.state = { searching: true, time: 3 };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ searching: false });
      this.decreaseTime();
    }, 5000);
  }

  decreaseTime() {
    setTimeout(() => {
      if (this.state.time > 1) {
        this.setState((state) => ({ time: state.time - 1 }));
        this.decreaseTime();
      } else {
        this.props.navigation.navigate("Game", { online: true });
      }
    }, 1000);
  }

  render() {
    const { searching, time } = this.state;
    return (
      <BG>
        <View style={s.container}>
          <Header
            back
            onBackPress={() =>
              searching
                ? this.props.navigation.goBack()
                : this.props.navigation.navigate("Result", {
                    win: 0,
                    online: true,
                  })
            }
          />
          <View style={s.mainContainer}>
            <View style={s.profilePicturesContainer}>
              <ProfilePicture size={100} name="Arda Zafer İbin" fullName />
              <Text style={s.textStyle}>vs.</Text>
              <ProfilePicture
                name={" "}
                searching={searching}
                borderColor={"#872887"}
                size={100}
                fullName
              />
            </View>
            {!searching ? (
              <View>
                <Text style={s.startingTextStyle}>Game is starting..</Text>
                <Text style={s.startingTextStyle}>{time}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </BG>
    );
  }
}

const s = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  profilePicturesContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "ConcertOne-Regular",
    fontSize: 40,
    color: "#fff",
  },
  startingTextStyle: {
    fontFamily: "ConcertOne-Regular",
    fontSize: 40,
    textAlign: "center",
    color: "#fff",
  },
};
