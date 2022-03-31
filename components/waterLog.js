import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { View, Text } from "react-native";
import axios from "axios";
import { EMaskUnits } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          <Card key={index}>
            <Card.Title title={e.date} key={index} left={LeftContent} />
            <Title>{e.totalLog} ML</Title>
            <Card.Content>
              {e.quantity.map((f, key) => {
                return (
                  <>
                    <View style={{ flexDirection: "row" }}>
                      <Paragraph
                        style={{
                          marginLeft: 10,
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
