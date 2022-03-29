import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerShown={false}>
    <RootStack.Screen name="MyTodos" component={SplashScreen} />
    <RootStack.Screen name="SignIn" component={SignIn} />
    <RootStack.Screen name="SignUp" component={SignUp} />
  </RootStack.Navigator>
);

export default RootStackScreen;
