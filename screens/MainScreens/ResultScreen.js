import React, { Component } from "react";
import BG from "../../components/BG";
import { View, Text } from "react-native";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import ProfilePicture from "../../components/ProfilePicture";

export default class ResultScreen extends Component {
  renderQuestions(questionsArray) {
    console.log(questionsArray);
    return questionsArray.map((e, i) => (
      <View style={s.questionContainer}>
        <Text style={s.questionTextStyle}>{e.data}</Text>
        {i < questionsArray.length - 1 ? (
          <AntDesign name="checkcircle" color="green" size={25} />
        ) : (
          <AntDesign name="closecircle" color="red" size={25} />
        )}
      </View>
    ));
  }

  render() {
    const { data, win, online } = this.props.route.params;

    return (
      <BG>
        <View style={s.container}>
          <Header />
          <View style={s.mainContainer}>
            <Text style={s.resultTextStyle}>
              {online
                ? win === "tie"
                  ? "Berabere"
                  : win
                  ? "Kazandın"
                  : "Kaybettin"
                : "Süren Bitti"}
            </Text>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <ProfilePicture size={90} name="Arda Zafer İbin" />
              </View>
              <Text style={s.resultTextStyle}>
                {online ? "0 - 0" : data.score}
              </Text>
              <View>
                <ProfilePicture size={90} name="Arda Zafer İbin" />
              </View>
            </View>
            {data ? (
              <React.Fragment>
                <View style={s.titleContainer}>
                  <CustomButton name="Sorular" />
                </View>
                {this.renderQuestions(data.questionsArray)}
              </React.Fragment>
            ) : null}

            <View style={s.titleContainer}>
              <CustomButton name="Tekrar Dene" />
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
    marginBottom: 20,
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
