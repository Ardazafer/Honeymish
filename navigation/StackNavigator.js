import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import LoginScreen from "../screens/AuthScreens/LoginScreen";
import SignupScreen from "../screens/AuthScreens/SignupScreen";
import AuthLoadingScreen from "../screens/AuthScreens/AuthLoadingScreen";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "AuthLoading";

export default function StackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoadingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
