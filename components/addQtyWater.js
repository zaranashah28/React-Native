import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function ModalTester(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = React.useState(null);
  const [mode, setMode] = useState("date");
  const [time, setTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

  return (
    <View>
      <TouchableOpacity style={styles.buttonStyle} onPress={toggleModal}>
        <Text style={styles.buttonText}>Add Water</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.7}
        style={styles.modalView}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.action}>
            <FontAwesome5
              name="calendar-alt"
              color="blue"
              size={20}
              onPress={showTimePicker}
            />
            <Text style={styles.label}>Add Quantity</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="e.g 100 ML"
              keyboardType="numeric"
            />
          </View>
          <Text style={{ marginTop: 4 }}>
            Time: {time.getHours() + ":" + time.getMinutes()}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity onPress={toggleModal} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Add Water</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode={"time"}
        date={time}
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 5,
    elevation: 8,
    backgroundColor: "#FFA07A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    alignSelf: "center",
  },
  modalView: {
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    margin: 12,
    height: 40,
    padding: 10,
    borderBottomColor: "#FFA07A",
    borderBottomWidth: 2,
    // height: 40,
    // margin: 12,
    // padding: 10,
    // borderBottomColor: "#FFA07A",
    // borderBottomWidth: 2,
  },
  label: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 15,
    fontWeight: "bold",
    margin: 12,
    height: 40,
    padding: 10,
    // height: 40,
    // margin: 12,
    // padding: 10,
    // borderBottomColor: "#FFA07A",
    // borderBottomWidth: 2,
  },

  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ModalTester;
