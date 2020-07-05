import React, { Component } from "react";
import BG from "../../components/BG";
import { View, Text } from "react-native";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ProfilePicture from "../../components/ProfilePicture";
import honeymishAPI from "../../API/honeymishAPI";

import fakeUserInfoAction from "../../Redux/actions/fakeUserInfo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ResultScreen extends Component {
  componentDidMount() {
    const {
      data,
      win,
      online,
      user,
      opponent,
      scores,
    } = this.props.route.params;
    if (online) {
      const goldObject = { gold: win ? 2 * 5 * scores[0] : 5 * scores[0] };

      const winObject =
        win !== "tie" && win ? { gamesWon: user.gamesWon + 1 } : {};

      const paramObj = { ...winObject, ...goldObject };
      this.props.fakeUserInfo(paramObj, user);
      honeymishAPI.updateMe(paramObj);
    } else {
      let record;
      if (data.practiceScore) {
        // Check whether the user has broke the record or not
        if (data.practiceScore > user.practiceScoreRecord) {
          // If they have broken update the record and
          record = data.practiceScore;
        }
        // Update the practice score
        const practiceScoreObject = {
          practiceScore: user.practiceScore + data.practiceScore,
        };

        const recordObject = record
          ? { practiceScoreRecord: data.practiceScore }
          : {};

        const paramObj = { ...practiceScoreObject, ...recordObject };
        this.props.fakeUserInfo(paramObj, user);
        honeymishAPI.updateMe(paramObj);
      }
    }
  }

  renderQuestions(questionsArray) {
    const { online } = this.props.route.params;
    return questionsArray.map((e, i) => (
      <View key={i.toString()} style={s.questionContainer}>
        <Text style={s.questionTextStyle}>{e.data}</Text>
        {i < questionsArray.length - 1 ? (
          online ? (
            <ProfilePicture noBorder size={25} photo={e.user.profilePic} />
          ) : (
            <AntDesign name="checkcircle" color="green" size={25} />
          )
        ) : (
          <AntDesign name="closecircle" color="red" size={25} />
        )}
      </View>
    ));
  }

  render() {
    const {
      data,
      win,
      online,
      user,
      opponent,
      scores,
    } = this.props.route.params;
    const { navigate } = this.props.navigation;
    return (
      <BG>
        <View style={s.container}>
          <Header />
          <View style={s.mainContainer}>
            <Text style={[s.resultTextStyle, { marginBottom: 20 }]}>
              {online
                ? win === "tie"
                  ? "Tie!"
                  : win
                  ? "You Won!"
                  : "You Lost!"
                : "Time's Up!"}
            </Text>
            <View
              style={{
                width: online ? "90%" : "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <ProfilePicture
                  size={90}
                  fullName
                  photo={user.profilePic}
                  name={user.name}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 50,
                }}
              >
                {online ? null : (
                  <MaterialIcons
                    name="stars"
                    size={30}
                    color={"rgba(0,0,0,0.5)"}
                  />
                )}
                <Text style={s.resultTextStyle}>
                  {online ? `${scores[0]} - ${scores[1]}` : data.practiceScore}
                </Text>
              </View>
              {online ? (
                <View>
                  <ProfilePicture
                    size={90}
                    fullName
                    photo={opponent.profilePic}
                    name={opponent.name}
                  />
                </View>
              ) : null}
            </View>
            {data ? (
              <React.Fragment>
                <View style={s.titleContainer}>
                  <CustomButton name="Questions" />
                </View>
                {this.renderQuestions(data.questionsArray)}
              </React.Fragment>
            ) : null}

            <View style={s.titleContainer}>
              <CustomButton
                onPress={() => {
                  navigate("Home");
                }}
                name={"Return to Main Menu"}
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
    width: "90%",
    height: "80%",
    backgroundColor: "rgba(0,0,0,0)",
  },
  resultTextStyle: {
    color: "#fff",
    fontSize: 40,
    fontFamily: "ConcertOne-Regular",
  },
  titleContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
  },
  questionContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  questionTextStyle: {
    fontFamily: "ConcertOne-Regular",
    fontSize: 18,
  },
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fakeUserInfo: fakeUserInfoAction,
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(ResultScreen);
