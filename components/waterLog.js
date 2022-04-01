import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { View, Text } from "react-native";
import axios from "axios";
import { EMaskUnits } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChartReducer from "../Context/chartReducer";

const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="calendar"
    color={"black"}
    style={{ backgroundColor: "#FFA07A" }}
  />
);

function WaterLog() {
  const [data, setData] = React.useState([]);
  const [dateWise, setDateWise] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);
  const [chartState, dispatch] = React.useReducer(
    ChartReducer.chartReducer,
    ChartReducer.initialState
  );
  // console.log(chartState);

  React.useEffect(async () => {
    let username = await AsyncStorage.getItem("userEmail");

    axios
      .get(`https://my-server-zarana.herokuapp.com/userQty?email=${username}`)
      .then((res) => {
        setQuantity(res?.data);
      });
  }, [quantity]);
  return (
    <>
      {quantity.map((e, index) => {
        return (
          <Card key={e.id}>
            <Card.Title title={e.date} key={index} left={LeftContent} />
            <Title>{e.totalLog} ML</Title>
            <Card.Content>
              {e.quantity.map((f) => {
                return (
                  <>
                    <View style={{ flexDirection: "row" }} key={e.id}>
                      <Paragraph
                        style={{
                          marginLeft: 10,
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {f} ML
                      </Paragraph>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {e.time}
                      </Text>
                      {/* <Paragraph key={index}>{} ML</Paragraph> */}
                    </View>
                  </>
                );
              })}
            </Card.Content>
          </Card>
        );
      })}
    </>
  );
}

export default WaterLog;
