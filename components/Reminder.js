import {
  
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import ChartReducer from "../Context/chartReducer";
import FetchReminder from "./fetchReminder";



export default function Reminder() {
     const [chartState, dispatch] = React.useReducer(
       ChartReducer.chartReducer,
       ChartReducer.initialState
     );

  const [mode, setMode] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [data,setData] = useState([])
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  React.useEffect(async() => {
    let username = await AsyncStorage.getItem("userEmail");
    axios.get(`https://my-server-zarana.herokuapp.com/reminders?email=${username}`).then((res) => {
      dispatch({ type: "FETCH_REMINDER_SUCCESS", data: res?.data });
      setData(res?.data)
    }).catch((err) => {
      dispatch({ type: "FETCH_REMINDER_FAIL" });
    });
  },[data])
  const showDatePicker = () => {
    setMode("date");
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  const showTimePicker = () => {
    setMode("time");
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setTime(time);
    hideTimePicker();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const addReminder = async(date, time) => {
  let data = await AsyncStorage.getItem("userEmail");
     const dateValue =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();

    const timeValue = time.getHours() + ":" + time.getMinutes();
    axios.post(`https://my-server-zarana.herokuapp.com/reminders`,{
      email:data,
      date:dateValue,
      time: timeValue

    }).then((res) => {}).catch((err) => console.log(err));
  };
  // console.log(data)
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Add Reminder</Text>
      <View style={styles.searchSection}>
        <FontAwesome5
          style={styles.searchIcon}
          name="calendar-alt"
          size={20}
          color="#000"
          onPress={() => showDatePicker()}
        />
        <Ionicons
          style={styles.searchIcon}
          name="time"
          size={20}
          color="#000"
          onPress={() => showTimePicker()}
        />
        <TextInput
          style={styles.input}
          placeholder="Add Reminder"
          onChangeText={(searchString) => {
            this.setState({ searchString });
          }}
          value={
            time.getHours().toString() +
            ":" +
            time.getMinutes() +
            "-" +
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
          }
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => addReminder(date, time)}
        >
          <Text style={styles.buttonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={mode === "date" ? isDatePickerVisible : isTimePickerVisible}
        mode={mode}
        onConfirm={mode === "date" ? handleConfirm : handleTimeConfirm}
        onCancel={mode === "date" ? hideDatePicker : hideTimePicker}
      />
      <FetchReminder data={data} />
      
    </View>
  );
}
const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    alignSelf: "center",
  },
  buttonStyle: {
    marginRight: 5,
    elevation: 8,
    backgroundColor: "#FFA07A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
