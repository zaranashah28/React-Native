import React from "react";
import AuthReducer from "./authReducer";
import axios from "axios";
export const createAccount = (email, password, phone, name) => {
  const authReducer = AuthReducer.loginReducer;
  const authState = AuthReducer.initialState;
  const [loginState, dispatch] = React.useReducer(authReducer, authState);

  var data = JSON.stringify({
    fullname: name,
    email: email,
    phone: phone,
    password: password,
  });
  var config = {
    method: "get",
    url: "https://my-server-zarana.herokuapp.com/users",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
