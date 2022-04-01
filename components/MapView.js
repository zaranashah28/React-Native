import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import MapView from "react-native-maps";
export default function MapViewComponent({ item, pressHandler }) {
  const [longitude, setLongitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");

  React.useEffect(() => {
    getMyLocation();
  }, []);

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          //   this.setState({
          //     latitude: "err-latitude",
          //     longitude: "err-longitude",
          //   });
        }
      );
    }
  };
  return (
    <View>
      <Text>MAP VIEW</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
