import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import Firebase from "../config/firebase";
import { AuthContext } from "../Context/authContext";
const auth = Firebase.auth();

const SignUp = ({ navigation }) => {
  const { authContext } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    phone: null,
    name: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const signUpHandle = async (email, passowrd, phone, fname) => {
    await auth.createUserWithEmailAndPassword(email, passowrd);
    authContext.signUp(email, passowrd, phone, fname);
    navigation.navigate("SignIn");
  };

  const nameInputChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };
  const phoneInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        phone: val,
      });
    }
  };

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const confirm_handlePasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const confirm_updateSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFA07A" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Account</Text>
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
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" size={20} color="green" />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={(styles.text_footer, { marginTop: 35 })}>FullName</Text>
        <View style={styles.action}>
          <FontAwesome name="pencil" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter you name"
            maxLength={10}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => nameInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" size={20} color="green" />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={(styles.text_footer, { marginTop: 35 })}>
          Phone Number
        </Text>
        <View style={styles.action}>
          <FontAwesome name="mobile-phone" color="#05375a" size={20} />
          <TextInput
            placeholder="Mobile Number"
            maxLength={10}
            keyboardType="numeric"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => phoneInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" size={20} color="green" />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={(styles.text_footer, { marginTop: 25 })}>Password</Text>
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

        {/* <Text style={(styles.text_footer, { marginTop: 25 })}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => confirm_handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={confirm_updateSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" size={20} color="#FFA07A" />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View> */}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              signUpHandle(data.email, data.password, data.phone, data.name)
            }
            style={styles.signIn}
          >
            <LinearGradient
              colors={["#E9967A", "#FFA07A"]}
              style={styles.signIn}
            >
              <Text style={(styles.signIn, { color: "white" })}>
                Create Account
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signUpHandle(data.email, data.password)}
            style={[
              styles.signIn,
              { borderColor: "#FFA07A", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={([styles.textSign], { color: "#FFA07A" })}>
              Sign In
            </Text>
          </TouchableOpacity>
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

export default SignUp;
