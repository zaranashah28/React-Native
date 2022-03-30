import axios from "axios";
import React, { useReducer } from "react";
import QuantityReducer from "../Context/quantityReducer";

function adduserReport(username, number, date, time, dispatch) {
  //   const [qtyState, dispatch1] = useReducer(
  //     QuantityReducer.quantityReducer,
  //     QuantityReducer.initialState
  //   );
  return axios
    .post("https://my-server-zarana.herokuapp.com/userReport", {
      email: username,
      quantity: number,
      date: date,
      time: time,
    })
    .then((res) => {
      if (res?.data) {
        dispatch({ type: "ADD_QTY_SUCCESS", data: res?.data });
        return res?.data;
        // setModalVisible(!isModalVisible);
      } else {
        dispatch({ type: "ADD_QTY_FAIL", data: res?.data });
      }
    })
    .catch((err) => {
      dispatch({ type: "ADD_QTY_FAIL", data: err });
    });
}

export default adduserReport;
