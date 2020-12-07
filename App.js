import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import StackNavigator from "./navigation/StackNavigator";
import MainStackNavigator from "./navigation/MainStackNavigator.js";
import useLinking from "./navigation/useLinking";
import FlashMessage from "react-native-flash-message";
// Redux

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import rootReducer from "./Redux/reducers/index";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          "Baloo-Bold": {
            uri: require("./assets/fonts/Baloo.ttf"),
          },
          "Bacon-Normal": {
            uri: require("./assets/fonts/Bacon-gBJ3.otf"),
          },
          "ConcertOne-Regular": {
            uri: require("./assets/fonts/ConcertOne-Regular.ttf"),
          },
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider
        store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}
      >
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="Auth"
                component={StackNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main"
                component={MainStackNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>

          <FlashMessage position="top" />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
