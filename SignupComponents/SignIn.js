import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import React, { useReducer } from "react";
import { AuthContext } from "../Context/authContext";
import Users from "../ModelData/user";
import Firebase from "../config/firebase";
import firebase from "firebase";
import { SocialIcon } from "react-native-elements";
// import * as Google from "expo-auth-session";

import * as Google from "expo-google-app-auth";
import AuthReducer from "../Context/authReducer";
const authReducer = AuthReducer.loginReducer;
const authState = AuthReducer.initialState;

const auth = Firebase.auth();
// GoogleSignin.configure({
//   webClientId:
//     "256509441522-4op56v9mtqmqd2v2pon6ed55hh5nhiv2.apps.googleusercontent.com",
// });
const SignIn = ({ navigation }) => {
  const [loginState, dispatch] = useReducer(authReducer, authState);

  const signInAsync = async () => {
    console.log("CLICKED");
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = Google.logInAsync({
        clientId: `313604574770-8jpptdhl41a646glvup3kfokhl8s5ura.apps.googleusercontent.com`,
      }).then((res) => {
        if (res.type === "success") {
          const { idToken, accessToken } = res;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          return firebase
            .auth()
            .signInWithCredential(credential)
            .then((response) => {
              authContext.signIn(res.user.email, res.accessToken, "Google");
            });
        }
        return Promise.reject();
      });
      // if (type === "success") {
      //   // Then you can use the Google REST API
      //   console.log("LoginScreen.js 17 | success, navigating to profile");
      //   const { idToken, accessToken } = type;
      //   console.log(idToken, accessToken, "TOKEN");
      //   // authContext.signIn(user.email, password);
      //   // if (response && response.user) {
      //   //   Alert.alert("Success ✅", "Authenticated successfully");
      //   //   // navigation.navigate("MyDrawer", { screen: "Todos" });
      //   // }
      //   // navigation.navigate("Todos");
      // }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  const { authContext } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: false,
    isValidPassword: false,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: false,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: true,
      });
    }
  };

  const loginHandle = async (username, password) => {
    try {
      if (username !== "" && password !== "") {
        let response = await auth.signInWithEmailAndPassword(
          username,
          password
        );
        authContext.signIn(username, password);
        if (response && response.user) {
          Alert.alert("Success ✅", "Authenticated successfully");
          // navigation.navigate("MyDrawer", { screen: "Todos" });
        }
      }
    } catch (error) {
      console.log(error);
      // setLoginError(error.message);
    }
    // const foundUser = Users.filter((item) => {
    //   return username === item.username;
    // });
    // if (foundUser.length === 0) {
    //   Alert.alert("Invalid user", "Email Address Does Not Exist", [
    //     { text: "Okay" },
    //   ]);
    // } else {
    //   await auth.signInWithEmailAndPassword(username, passowrd);
    // signIn(foundUser);
    // }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    }
  };

  const onGoogleButtonPress = () => {
    console.log("Clicked");
  };

  const handleValidUser = (e) => {
    if (e.length >= 8) {
      setData({
        ...data,
        isValidUser: false,
      });
    } else {
      setData({
        ...data,
        isValidUser: true,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFA07A" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Email Address"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" size={20} color="green" />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? (
          <Animatable.View animate="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        ) : null}
        <Text style={(styles.text_footer, { marginTop: 35 })}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" size={20} color="#FFA07A" />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? (
          <Animatable.View animate="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long
            </Text>
          </Animatable.View>
        ) : null}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => loginHandle(data.email, data.password)}
            style={styles.signIn}
          >
            <LinearGradient
              colors={["#E9967A", "#FFA07A"]}
              style={styles.signIn}
            >
              <Text style={(styles.signIn, { color: "white" })}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[
              styles.signIn,
              { borderColor: "#FFA07A", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={([styles.textSign], { color: "#FFA07A" })}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={(styles.button, { width: "100%" })}>
          <SocialIcon
            button
            type="google"
            onPress={() => signInAsync()}
            title="Sign in with Google"
          />
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#rgb(242,242,242)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignIn;
