import React, { Component } from "react";
import { Text, View } from "react-native";
import ProfilePicture from "../components/ProfilePicture";
import BG from "../components/BG";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import io from "socket.io-client";
import { connect } from "react-redux";
import showFlashMessage from "../helpers/showFlashMessage";

let socket;
const baseURL = "https://honeymish.oa.r.appspot.com";

class PlayerSearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      searching: true,
      time: 3,
      timeoutId: null,
      opponent: null,
      question: null,
    };
  }

  componentDidMount() {
    socket = io(baseURL);

    socket.emit("addToQueue", { user: this.props.user });

    socket.on("gameFound", ({ room, user, question }) => {
      this.setState({ searching: false, opponent: user, question });
      this.decreaseTime(room, socket);
    });
    const newTimeoutId = setTimeout(() => {
      if (this.state.searching) {
        showFlashMessage(
          "Search Failed!",
          "Sorry, there is no one searching for a game now :("
        );
        this.props.navigation.goBack();
      }
    }, 1000 * 20);
    this.setState({ timeoutId: newTimeoutId });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
    socket.emit("disconnect");
    socket.off();
    socket.close();
  }
  decreaseTime(room, socket) {
    setTimeout(() => {
      if (this.state.time > 1) {
        this.setState((state) => ({ time: state.time - 1 }));
        this.decreaseTime(room, socket);
      } else {
        this.props.navigation.navigate("Game", {
          online: true,
          room,
          socket,
          question: this.state.question,
          opponent: this.state.opponent,
        });
      }
    }, 1000);
  }

  render() {
    const { searching, time, opponent } = this.state;
    const { user } = this.props;
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
              <ProfilePicture
                photo={user.profilePic}
                size={100}
                name={user.name}
                fullName
              />
              <Text style={s.textStyle}>vs.</Text>
              <ProfilePicture
                photo={!searching ? opponent.profilePic : null}
                name={!searching ? opponent.name : " "}
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(PlayerSearchScreen);
