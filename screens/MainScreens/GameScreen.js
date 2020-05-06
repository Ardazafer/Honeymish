import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import BG from "../../components/BG";
import Header from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import RemainingTime from "../../components/RemainingTime";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ID from "../../helpers/ID";

export default class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      score: 0,
      isTfReady: false,
    };
  }

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true,
    });
    console.log(this.state.isTfReady);
    this.getQuestion();
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.route;

    if (params && params.photo) {
      // burda image processing işlemini yapcaz lsdksldk photoyu aldık doğruluğuna bakcak şimdilik boş bir
      // fonksiyon yapymo ldskfslfks
      // o zaman ne vakti sdlfksdlfk sldkdslfk yapalım ama her şey saydam olunca bi garip olur sanki
      // naptık olum o kazandın kaybettin muhabbeti bi 2 saa

      // yorumları silmiyorum lan lsdkfslfks okuruz sonra ldksflsdkf

      this.processPhoto(params.photo);
    }
  }

  processPhoto(photo) {
    // ............. bitti mi ldsfkdslf olum imkansız ötesi amk dslkflskfsf gerçi benağ ödevi yaptım geçen ldskfldsfk server client filan biliyoruz bi şeyler ldskflsdkff
    // image processing

    const result = true; // Math.floor(Math.random() * 2);

    if (result) {
      this.setState((state) => ({ score: state.score + 1 }));
      this.timer.reset();

      setTimeout(() => {
        this.getQuestion();
        this.timer.decreaseTime();
      }, 0);
    }

    let temporaryArray = [...this.state.questionsArray];

    temporaryArray[temporaryArray.length - 1].answers.push({
      user: null,
      data: photo,
      result,
    });

    this.setState((state) => ({
      questionsArray: temporaryArray,
    }));

    /*
    this.setState((state) => ({
      questionsArray: [
        ...state.questionsArray,
        { type: "photo", data: photo, result },
      ], // bu result da doğru cevap mı yanlış mı onu tutuyorum processing işlemi sonucunda işte doğru çıkarsa result true dicem yanına tik mik çizeriz flase sa çarpı sonrada yeni soru
    }));*/
  }

  /**
   *
   * [
   *   {
   *     type: "question",
   *     data: "Bu kısrmızı objeyi bul"
   *   },
   *   {
   *     type: "photo",
   *     data: "img",
   *     result: true
   *   },
   *   {
   *     type: "question",
   *     data: "Bu kısrmızı objeyi bul"
   *   },
   *   {
   *     type: "photo",
   *     data: "img",
   *     result: false
   *   },{
   *     type: "photo",
   *     data: "img",
   *     result: false
   *   },{
   *     type: "photo",
   *     data: "img",
   *     result: false
   *   },{
   *     type: "photo",
   *     data: "img"
   *     result: false
   *   },
   *
   * ]
   *
   * [
   *
   *  {
   *    type: "question",
   *    data: "en yakın ç..",
   *    answers: [
   *              {
   *                user: "1",
   *                data: "img",
   *                result: false
   *              }
   *             ]
   *  },
   * {
   *    type: "question",
   *    data: "en yakın ç..",
   *    answers: [
   *              {
   *                user: "1",
   *                data: "img",
   *                result: false
   *              }
   *             ]
   *  },
   * {
   *    type: "question",
   *    data: "en yakın ç..",
   *    answers: [
   *              {
   *                user: "1",
   *                data: "img",
   *                result: false
   *              }
   *             ]
   *  }
   * ]
   *
   *
   */

  // kaçt abşalayıp kanka cs survivor ldsfksldfk yarın kavga var kesin izlerim 12

  // plan:
  // arda uyandı: 15 - 16 kanka anca slkdsldkdsklf sklsşgjsflksjflskdfşjsd
  // yok lan minecraft 1.5 saat
  // youtube 4 saat sdkfsldfkdsfl az dedim olum naptın sldfksdf benim izlediğim 1 video 60 dk yok skdflksdlfdskf
  // tamam yt - 4 saat
  // saat oldu 21.5
  // survivor 2 saat
  // o zaman cs 2 saat okay aynen 3 olsun sldksld
  // tez 2.00 - 3.5
  // 11.5 da başlamam konsey var lsdkfsdlgkflg
  // ne bi daha söyle
  // olum keşke 11 de uyancaksan beni deuyandır lskdlsdk
  // ara lan slkslgksdlskflsf
  // hem de nasıl sdlfkdlfsdkfdsl kanka cs olmazsa gram düşünemem tezi ksklsdk aynen saat 7 olum baksanıza mis gibi yaptık ldsksdlfsdj
  // sldfkslsdk gartic şart goy goy şart
  // olur kanka ksdlfkdslfk yok be ben yazıvırıyom hemen sdlkfsldfks bana mı diyon
  // ldfksdlfskdlgs ne düşünüyoz o zaman bakalım survivor ı salabiliriz harbiden cs yierkene çekeriz okay
  // ha önce tez sonra cs mi atraız yauv
  // ben uyanınca youtube dan izlerim lskdsldk o zaman yarın deneyelim yeni planı aynen evet olum sinir oluyom
  // o zaman yarın 20 de filan mı başlasak haaa foğru 21-24 arası mı ama az işte o zaman yarın 21 kesin bi deneyelim bakalım ama bence 3 saataz gibi yarın için değil de
  // yarın sensörü halleidn de sonra ama cs işte lskdslkgklsdk bunu bi gruptan konuşalım biz cs saatiini belileyeim sldkslkd hayır da cs yi 3 4 e sarkıtamayız ama tezi sarkıtırız slkdsldk bakalım ya lskdsldk
  // bence okay geliriz bugün geldik olum 3 de ona lskdsldk 3 3 bence de
  // son plan 22-24 tez 00-03 cs 04-07 tez muazzam 7 saat lan müthiş aynen sdlkfsdflsdkgsdl nasıl lan 3 olum cs sarkar 12 den 12.30 a filan aynen
  // ması llan ldskfslfk napıyonuz olum ha çok yiyosun doğru sldksldk doğru doğru
  // bence 3de girip 3.5 a kadar çalışı mola vermek çok mantıksız olum parçalanıyo 4 de girip laps 3 saat gömeriz aralıksız
  // tamam o zaman yatak ksdlfksfdl iyi geceler kdsfksdl ben dedim ldkslgj
  getQuestion() {
    this.setState((state) => ({
      questionsArray: [
        ...state.questionsArray,
        {
          id: ID(),
          data: "En yakınındaki mavi objeyi bul!",
          answers: [],
        },
      ],
    }));
  }

  renderAnswers(answersArray) {
    return answersArray.map((answer) =>
      // condition = answer.userId === this.props.userId
      false ? (
        <View
          key={answer.data.uri}
          style={[
            s.photoContainer,
            {
              justifyContent: "flex-end",
            },
          ]}
        >
          {answer.result ? (
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
          {answer.result ? (
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
      <React.Fragment key={question.id}>
        <View style={s.questionContainer}>
          <Text style={s.questionTextStyle}>
            En yakınındaki mavi objeyi bul!
          </Text>
        </View>
        {this.renderAnswers(question.answers)}
      </React.Fragment>
    ));
  }

  onTimeEnded() {
    this.props.navigation.navigate("Result", {
      data: this.state,
      win: 0, // opponentScore > myScore
      online: this.props.route.params.online,
    });
  }

  openCamera() {
    this.props.navigation.navigate("Camera");
  }

  render() {
    const { online } = this.props.route.params;
    return (
      <BG>
        <View style={s.container}>
          <Header
            back
            onBackPress={() => this.props.navigation.goBack()}
            score={online ? null : this.state.score}
          />
          <View style={s.mainContainer}>
            <View style={s.timeContainer}>
              <RemainingTime
                online={online}
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
                name="Kamera'yı Aç"
                onPress={() => this.openCamera()}
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
