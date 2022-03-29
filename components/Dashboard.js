import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useReducer, useEffect } from "react";
import AuthReducer from "../Context/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "./todoItem";
import Firebase from "../config/firebase";
import { AuthContext } from "../Context/authContext";
import ChartReducer from "../Context/chartReducer";
import { getAuth } from "firebase/auth";
import DateTimePickerComponent from "./dateTimePickerComponent";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import axios from "axios";
import ModalTester from "./addQtyWater";
export default function Dashboard() {
  const [todos, setTodos] = useState([
    { text: "Buy Coffee", key: "1" },
    { text: "Learn React native", key: "2" },
    { text: "Go for Lunch", key: "3" },
    { text: "Complete React Native assignment", key: "4" },
  ]);

  // const authUSER = getAuth();
  // const user0 = authUSER.currentUser;
  // console.log(user0, "USER0");
  // const authReducer = AuthReducer.loginReducer;
  // const authState = AuthReducer.initialState;

  // const [state, dispatch] = useReducer(authReducer, authState);
  // console.log(state, "State");
  const [chartState, dispatch] = useReducer(
    ChartReducer.chartReducer,
    ChartReducer.initialState
  );
  const authData = Firebase.auth();
  const userData = Firebase.auth().currentUser;
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [chart, setChart] = useState([]);

  const { auth, authContext } = React.useContext(AuthContext);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const setChange = (data) => {
    setChart(data);
  };

  useEffect(async () => {
    let token;
    setTimeout(async () => {
      try {
        userToken = null;
        token = await AsyncStorage.getItem("userToken");
        authData.getIdToken;
      } catch (e) {
        console.log(e);
      }
      let data = await AsyncStorage.getItem("userEmail");
      axios
        .get(`https://my-server-zarana.herokuapp.com/userReport?email=${data}`)
        .then((res) => {
          if (res?.data) {
            setChange(res?.data);
            dispatch({ type: "FETCH_CHART_SUCCESS", data: res.data });
          } else {
            dispatch({ type: "FETCH_CHART_FAIL", data: res.data });
          }
        });
      const subscriber = authData.onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, 1000);
  }, [chart]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };
  if (initializing) return null;
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  let qty = chartState?.chartData.map((e) => e.quantity);
  let qtyLabel = qty.filter((data, index) => index < 7);

  // console.log(new Date(19 / 3 / 2021));
  // let date = "19/03/2021";
  // console.log(date.split("/")[0]);
  const dates = [];
  // let parseData;
  let time = chartState?.chartData.map((e) => e.date);
  let timeLabel = time
    .filter((data, index) => index < 7)
    .map((date) => {
      const newDate = date?.split("/")[0];
      let parseData = parseInt(newDate);
      dates.push(parseData);
    });
  // dates.map((date) => console.log(typeof date));
  console.log(typeof dates);
  const data = {
    labels: dates,

    datasets: [
      {
        data: qty.length >= 1 ? qtyLabel : [0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Drinked Water"], // optional
  };
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>DateWise Progession</Text>

          <LineChart
            withDots={true}
            data={data}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            // yAxisLabel="$"
            yAxisSuffix=" ml "
            yAxisInterval={2} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.title}>Drink Water</Text>
          <ModalTester />
        </View>
      </ScrollView>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  list: {
    marginTop: 20,
  },
});
