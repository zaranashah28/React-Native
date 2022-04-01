import { Text, StyleSheet, TouchableOpacity,View,TextInput } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import ChartReducer from "../Context/chartReducer";
import Modal from "react-native-modal";


export default function FetchReminder(props) {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [edit, setEdit] = useState("");
  const [toggleData,setToggleData] = useState([])
   const [chartState, dispatch] = React.useReducer(
     ChartReducer.chartReducer,
     ChartReducer.initialState
   );

  const editReminder = (id) => {
     const {data} = props;
     let updateData = data.filter((e) => e.id === id)
    setToggleData(updateData)
    setEdit(updateData)
    setModalVisible(!isModalVisible);
  };

  const toggleModal = () => {
      setModalVisible(!isModalVisible)
  }
// console.log(edit)
 const deleteReminder = (id) => {
    axios.delete(`https://my-server-zarana.herokuapp.com/reminders/${id}`).then((res) => {
    });
     console.log("DELETE",id)
 }
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}
    >
      <Text style={styles.item}>Reminders</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>Time</DataTable.Title>
          <DataTable.Title numeric>Actions</DataTable.Title>
        </DataTable.Header>
        {props.data.map((e, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{e.date}</DataTable.Cell>
              <DataTable.Cell>{e.time}</DataTable.Cell>
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name="edit"
                  size={20}
                  style={{ marginRight: 15 }}
                  onPress={() => editReminder(e.id)}
                />
                <AntDesign
                  name="delete"
                  size={20}
                  onPress={() => deleteReminder(e.id)}
                />
              </View>
              {/* <DataTable.Cell >6.0</DataTable.Cell> */}
            </DataTable.Row>
          );
        })}
        {/* )         */}
      </DataTable>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.7}
        style={styles.modalView}
      >
        <Text>Edit</Text>
        <View style={styles.action}>
          <TextInput
            // onChange={(text) => setEdit({
            //     ...edit,
            //     date:text
            // })}
            // value={edit }
            style={styles.input}
          />
          <TextInput
            onChange = {(text) => setToggleData({
                ...toggleData,
                
            })}
            value={toggleData.map((e) => e.time).toString()}
            style={styles.input}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <TouchableOpacity
            // onPress={() => addWaterQty(number, time)}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Edit Reminder</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginBottom: 5,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  action: {
    //   flex:1,
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 5,
  },
  modalView: {
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
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
