import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalTester from "./addQtyWater";
const DateTimePickerComponent = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [time, setTime] = useState(new Date());
  const [adate, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const showDatePicker = () => {
    setMode("date");
    setDatePickerVisibility(true);
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
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  return (
    <View>
      <ModalTester />

      <View style={{ margin: 20 }}>
        <Button title="Show Time Picker" onPress={showTimePicker} />
        <Text style={{ fontSize: 30, color: "black", fontWeight: "bold" }}>
          Time: {time.getHours() + ":" + time.getMinutes()}
        </Text>
      </View>

      <DateTimePickerModal
        isVisible={mode === "date" ? isDatePickerVisible : isTimePickerVisible}
        mode={mode}
        date={mode === "date" ? adate : time}
        onConfirm={mode === "date" ? handleConfirm : handleTimeConfirm}
        onCancel={mode === "date" ? hideDatePicker : hideTimePicker}
      />
    </View>
  );
};

export default DateTimePickerComponent;
