import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import BG from "../../components/BG";
import Header from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import RemainingTime from "../../components/RemainingTime";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ID from "../../helpers/ID";

import honeymishAPI from "../../API/honeymishAPI";
import objToFormData from "../../helpers/objToFormData";

import { connect } from "react-redux";
import showFlashMessage from "../../helpers/showFlashMessage";
import logoutUserAction from "../../Redux/actions/logoutUser";
import { bindActionCreators } from "redux";

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      practiceScore: 0,
      image: null,
      myScore: 0,
      opponentScore: 0,
    };
  }

  componentDidMount() {
    const { online } = this.props.route.params;

    if (online) {
      const { room, socket, question, opponent } = this.props.route.params;
      const { myScore, opponentScore } = this.state;

      socket.emit("join", { name: "arda", room }, (error) => {
        if (error) {
          console.log(`Hata: ${error}`);

          socket.emit("disconnect");
          socket.off();
          this.props.navigation.goBack();
        }
      });

      socket.on("userLeft", () => {
        this.props.navigation.navigate("Result", {
          data: this.state,
          win: 1,
          online: true,
          user: this.props.user,
          opponent: opponent,
          scores: [myScore, opponentScore],
        });
      });

      socket.on("objectData", (data) => {
        console.log("socket verisi geldi:", data);

        this.updatePhotoResult(data);
      });

      socket.on("otherPersonsAnswer", (data) => {
        console.log("diğer adamın cevabı geldi:", data);
        this.receiveOpponentsAnswer(data);
      });

      // socketten soru bekle
      // Get the first question in online mode
      this.getQuestion(question);
    } else {
      // Get the first question in practice mode
      this.getQuestion();
    }
  }

  componentWillUnmount() {
    this.disconnect(true);
  }

  disconnect(ul) {
    const { socket, online } = this.props.route.params;

    if (online) {
      console.log("çıktım ");
      socket.emit("disconnect", { userLeft: ul });
      socket.off();
      socket.close();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { params } = nextProps.route;
    const { user } = this.props;

    if (params && params.photo) {
      const photoId = ID();
      const { questionsArray } = this.state;
      const currentQuestion = questionsArray[questionsArray.length - 1];
      let formData;
      if (params.online) {
        formData = objToFormData({
          objectPhoto: {
            uri: params.photo.uri,
            type: "image/jpg",
            name: "object.jpg",
          },
          width: params.photo.width,
          height: params.photo.height,
          room: params.room,
          photoId,
          socketId: params.socket.id,
          answers: JSON.stringify(currentQuestion.answers),
          online: true,
        });
      } else {
        formData = objToFormData({
          objectPhoto: {
            uri: params.photo.uri,
            type: "image/jpg",
            name: "object.jpg",
          },
          width: params.photo.width,
          height: params.photo.height,
          photoId,
          answers: JSON.stringify(currentQuestion.answers),
          online: false,
        });
      }
      this.setState({ pending: true });
      honeymishAPI
        .processImage(formData)
        .then((res) => {
          console.log("Res Data:", res.data);
          if (res.data.banned) {
            this.props.logoutUser(
              this.props.navigation.navigate,
              res.data.banned
            );
          }
          if (!params.online) {
            this.updatePhotoResult(res.data);
          }
        })
        .catch((err) => {
          console.log("process image error");
          console.log(err.response || err.data || err);
        });

      this.createPhoto(params.photo, photoId);
    }
  }

  updatePhotoResult(data) {
    const temporaryArray = [...this.state.questionsArray];
    const currentQuestion = temporaryArray[temporaryArray.length - 1];
    const currentAnswers = currentQuestion.userAnswers;

    const currentAnswer = currentAnswers.find(
      (answer) => answer.photoId === data.photoId
    );

    if (currentAnswer) {
      currentAnswer.result = data.result;
      currentQuestion.user = data.user;
      if (data.result) {
        const { online } = this.props.route.params;
        const { user } = this.props;
        if (online) {
          if (data.question) {
            // This means someone sent the correct answer

            // Increase the user's point by one
            if (data.user._id === user._id) {
              // This means I got the correct answer
              this.setState((state) => ({ myScore: state.myScore + 1 }));
            } else {
              // This means my opponent got the correct answer
              this.setState((state) => ({
                opponentScore: state.opponentScore + 1,
              }));
            }
            this.getQuestion(data.question);
          }
        } else {
          // Show flash message if the user breaks their record
          if (this.state.practiceScore == user.practiceScoreRecord) {
            showFlashMessage(
              "Hooraayy!!",
              "You broke your record, congratulations!"
            );
          }
          // Increase the practice scroe by 1
          this.setState((state) => ({
            practiceScore: state.practiceScore + 1,
          }));
          // Get the next question in practice mode if the answer is correct
          this.getQuestion();
        }
      }

      this.setState({
        pending: false,
        questionsArray: temporaryArray,
      });
    }
  }

  receiveOpponentsAnswer(data) {
    const temporaryArray = [...this.state.questionsArray];
    const currentQuestion = temporaryArray[temporaryArray.length - 1];
    const currentAnswers = currentQuestion.userAnswers;
    console.log({ uri: data.photo, ...data.photoProps });
    currentAnswers.push({
      user: "opponent",
      data: { uri: data.photo, ...data.photoProps },
      photoId: data.photoId,
      result: data.result,
    });

    this.setState({ questionsArray: temporaryArray });
  }

  createPhoto(photo, photoId) {
    console.log("front enddeki photo id:", photoId);
    // image processing

    const result = "processing"; // Math.floor(Math.random() * 2);
    const { online } = this.props.route.params;

    let temporaryArray = [...this.state.questionsArray];

    temporaryArray[temporaryArray.length - 1].userAnswers.push({
      user: "me",
      data: photo,
      result,
      photoId,
    });

    this.setState((state) => ({
      questionsArray: temporaryArray,
    }));
  }

  getQuestion(question) {
    console.log("Get question çalıştı", question);
    question
      ? (() => {
          setTimeout(() => {
            this.setState((state) => ({
              questionsArray: [
                ...state.questionsArray,
                {
                  ...question,
                  userAnswers: [],
                },
              ],
            }));
          }, 100);
        })()
      : honeymishAPI
          .getQuestion()
          .then((res) => {
            console.log(res.data);
            this.setState((state) => ({
              questionsArray: [
                ...state.questionsArray,
                {
                  ...res.data,
                  userAnswers: [],
                },
              ],
            }));
          })
          .catch((err) => {
            console.log("Get Question Error");
            console.log(err);
          });
  }

  renderAnswers(answersArray) {
    return answersArray.map((answer) =>
      // condition = answer.userId === this.props.userId
      answer.user === "me" ? (
        <View
          key={answer.data.uri}
          style={[
            s.photoContainer,
            {
              justifyContent: "flex-end",
            },
          ]}
        >
          {answer.result === "processing" ? (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: Colors.mainColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : answer.result ? (
            <AntDesign name="checkcircle" color="green" size={25} />
          ) : (
            <AntDesign name="closecircle" color="red" size={25} />
          )}
          <Image
            style={[
              s.photoStyle,
              {
                marginLeft: 10,
                width: answer.data.width / 12,
                height: answer.data.height / 12,
              },
            ]}
            source={{ uri: answer.data.uri }}
          />
        </View>
      ) : (
        <View
          key={answer.data.uri}
          style={[
            s.photoContainer,
            {
              justifyContent: "flex-start",
            },
          ]}
        >
          <Image
            style={[
              s.photoStyle,
              {
                marginRight: 10,
                width: answer.data.width / 12,
                height: answer.data.height / 12,
              },
            ]}
            source={{ uri: answer.data.uri }}
          />
          {answer.result === "processing" ? (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: Colors.mainColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : answer.result ? (
            <AntDesign name="checkcircle" color="green" size={25} />
          ) : (
            <AntDesign name="closecircle" color="red" size={25} />
          )}
        </View>
      )
    );
  }

  renderGame(questionsArray) {
    return questionsArray.map((question) => (
      <React.Fragment key={question._id}>
        <View style={s.questionContainer}>
          <Text style={s.questionTextStyle}>{question.data}</Text>
        </View>
        {this.renderAnswers(question.userAnswers)}
      </React.Fragment>
    ));
  }

  getWinString() {
    const { myScore, opponentScore } = this.state;
    switch (true) {
      case myScore === opponentScore:
        return "tie";
      case myScore > opponentScore:
        return true;
      case myScore < opponentScore:
        return false;
    }
  }

  onTimeEnded() {
    const { navigation, route, user } = this.props;
    const { myScore, opponentScore } = this.state;
    this.disconnect(false);

    navigation.navigate("Result", {
      data: this.state,
      win: this.getWinString(),
      online: route.params.online,
      user,
      opponent: route.params.opponent,
      scores: [myScore, opponentScore],
    });
  }

  openCamera() {
    this.props.navigation.navigate("Camera");
  }

  render() {
    const { online, opponent } = this.props.route.params;
    const { user } = this.props;
    const { myScore, opponentScore } = this.state;
    return (
      <BG>
        <View style={s.container}>
          <Header
            back
            onBackPress={() => {
              this.props.navigation.navigate("Home");
            }}
            score={online ? null : this.state.practiceScore}
          />
          <View style={s.mainContainer}>
            <View style={s.timeContainer}>
              <RemainingTime
                user={user}
                opponent={opponent}
                online={online}
                scores={[myScore, opponentScore]}
                ref={(ref) => (this.timer = ref)}
                onTimeEnded={() => this.onTimeEnded()}
              />
            </View>
            <View style={s.gameContainer}>
              <ScrollView contentContainerStyle={s.gameScrollView}>
                {this.renderGame(this.state.questionsArray)}
              </ScrollView>
            </View>

            <View style={s.buttonContainer}>
              <CustomButton
                name={this.state.pending ? "Please wait!" : "Open Camera"}
                onPress={() => (this.state.pending ? null : this.openCamera())}
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
    height: "90%",
    backgroundColor: "rgba(0,0,0,0)",
  },
  gameContainer: {
    width: "100%",
    height: "75%",
    backgroundColor: "rgba(255,255,255,0.5)",
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  timeContainer: {
    width: "100%",
    height: 100,
  },
  buttonContainer: {
    width: "100%",
    height: 60,
  },
  gameScrollView: {
    padding: 10,
  },
  photoContainer: {
    width: "100%",
    alignItems: "flex-end",
    padding: 5,
    flexDirection: "row",
  },
  photoStyle: {
    borderRadius: 5,
  },
  questionContainer: {
    width: "70%",
    padding: 5,
    backgroundColor: Colors.mainColor,
    borderRadius: 5,
    margin: 5,
  },
  questionTextStyle: {
    fontFamily: "ConcertOne-Regular",
    fontSize: 20,
    color: "#fff",
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
      logoutUser: logoutUserAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
