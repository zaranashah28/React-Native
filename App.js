import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./Common/NavBar";
import RootStackScreen from "./SignupComponents/RootStackScreen";
import { useReducer } from "react";
import AuthReducer from "./Context/authReducer";
import ThemeReducer from "./Context/themeReducer";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useMemo } from "react";
import { AuthContext } from "./Context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeContext } from "./Context/themeContext";
import "./i18n/i18";
import Firebase from "./config/firebase";
import { createStackNavigator } from "@react-navigation/stack";
import ChartReducer from "./Context/chartReducer";
import { useTranslation } from "react-i18next";
import { createAccount } from "./Context/authAction";
import { chartContext } from "./Context/chartContext";
const auth = Firebase.auth();

export default function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  const authReducer = AuthReducer.loginReducer;
  const authState = AuthReducer.initialState;
  const [loginState, dispatch] = useReducer(authReducer, authState);
  const [chartState, dispatch2] = useReducer(
    ChartReducer.chartReducer,
    ChartReducer.initialState
  );
  const [themeState, dispatch1] = useReducer(
    ThemeReducer.themeReducer,
    ThemeReducer.initialState
  );
  const themeContextData = useMemo(() => ({
    darkMode: () => {
      dispatch1({
        type: "DARKMODE",
      });
    },
    lightMode: () => {
      dispatch1({
        type: "LIGHTMODE",
      });
    },
  }));

  // const chartContextData = useMemo(() => ({
  //   fetchRequest: () => {
  //     dispatch2({
  //       type: "FETCH_CHART_REQUEST",
  //     });
  //   },
  //   fetchSuccess: () => {
  //     dispatch2({
  //       type: "FETCH_CHART_SUCCESS",
  //     });
  //   },
  //   fetchFail: () => {
  //     dispatch2({
  //       type: "FETCH_CHART_FAIL",
  //     });
  //   },
  // }));

  const authContext = useMemo(
    () => ({
      signIn: async (username, password, Google) => {
        if (Google === "Google") {
          await AsyncStorage.setItem("userToken", password);
          await AsyncStorage.setItem("userEmail", username);

          dispatch({ type: "LOGIN", id: username, token: password });
        }
        // let userToken;
        // userToken = String(foundUser[0].userToken);
        // const userName = foundUser[0].username;
        else {
          try {
            response = await auth.signInWithEmailAndPassword(
              username,
              password
            );
            await AsyncStorage.setItem("userToken", response.user.uid);
            await AsyncStorage.setItem("userEmail", username);
          } catch (e) {
            console.log(e);
          }
          dispatch({ type: "LOGIN", id: username, token: response.user.uid });
        }
      },
      retreiveToken: async () => {
        let token = await AsyncStorage.getItem("userToken");
        dispatch({ type: "RETREIVE_TOKEN", id: username, token: token });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          await auth.signOut();
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },

      signUp: async (email, password, phone, name) => {
        createAccount(email, password, phone, name);
      },
    }),
    []
  );
  useEffect(() => {
    let token;
    setTimeout(async () => {
      try {
        userToken = null;
        token = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETREIVE_TOKEN", token: token });
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" animating={true} />
      </View>
    );
  }
  const Stack = createStackNavigator();
  return (
    <chartContext.Provider value={{ chart: chartState }}>
      <themeContext.Provider value={{ mode: themeState, themeContextData }}>
        <AuthContext.Provider value={{ auth: loginState, authContext }}>
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <Stack.Navigator>
                <Stack.Screen
                  name="MyDrawer"
                  component={MyDrawer}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            ) : (
              // <MyDrawer />
              <RootStackScreen />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </themeContext.Provider>
    </chartContext.Provider>
  );
}
