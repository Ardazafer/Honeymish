import React, { Component } from "react";
import { Text, View } from "react-native";
import ProfilePicture from "./ProfilePicture";
import Colors from "../constants/Colors";

const barColor = "#fff";
const startingTime = 90;

export default class RemainingTime extends Component {
  constructor() {
    super();
    this.state = {
      time: startingTime,
      timeoutId: null,
    };
  }

  reset() {
    clearTimeout(this.state.timeoutId);
    this.setState({ time: startingTime });
  }

  componentDidMount() {
    this.decreaseTime();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  decreaseTime() {
    const newTimeoutId = setTimeout(() => {
      if (this.state.time > 0) {
        this.setState((state) => ({ time: state.time - 1 }));
        this.decreaseTime();
      } else {
        this.props.onTimeEnded();
      }
    }, 1000);

    this.setState({
      timeoutId: newTimeoutId,
    });
  }

  render() {
    const { online, user, opponent, scores } = this.props;
    const { time } = this.state;
    return online ? (
      <View
        style={[
          s.mainContainer,
          {
            padding: 10,
          },
        ]}
      >
        <View>
          <ProfilePicture photo={user.profilePic} size={60} name={user.name} />
        </View>
        <View
          style={{
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={s.textStyle}>{time}</Text>
          <View
            style={[
              s.timerBar,
              {
                width: 180 * (time / startingTime),
              },
            ]}
          />

          <Text style={s.textStyle}>{`${scores[0]} : ${scores[1]}`}</Text>
        </View>
        <View>
          <ProfilePicture
            photo={opponent.profilePic}
            size={60}
            name={opponent.name}
          />
        </View>
      </View>
    ) : (
      <View
        style={[
          s.mainContainer,
          {
            padding: 20,
          },
        ]}
      >
        <ProfilePicture photo={user.profilePic} size={60} />
        <View style={s.timerBarContainer}>
          <View
            style={[
              s.timerBar,
              {
                marginLeft: 30,
                width: 260 * (time / startingTime),
              },
            ]}
          />
        </View>
        <Text style={s.timeTextStyle}>{this.state.time}</Text>
      </View>
    );
  }
}

const s = {
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  timerBarContainer: {
    position: "absolute",
    zIndex: -1,
    flexDirection: "row",
  },
  timerBar: {
    borderRadius: 20,
    height: 10,
    backgroundColor: barColor,
    alignItems: "flex-end",
  },
  timerBarEnd: {
    backgroundColor: barColor,
    width: 20,
    height: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  timerBarStart: {
    backgroundColor: barColor,
    width: 20,
    height: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  timeTextStyle: {
    fontFamily: "ConcertOne-Regular",
    fontSize: 30,
    color: "#fff",
  },
  textStyle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "ConcertOne-Regular",
    fontSize: 25,
  },
};
