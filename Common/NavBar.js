import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Reminder from "../components/Reminder";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, TouchableOpacity, View, Text, Switch } from "react-native";
const Drawer = createDrawerNavigator();
import { AuthContext } from "../Context/authContext";
import { themeContext } from "../Context/themeContext";
// const { signOut } = React.useContext(AuthContext);
import { fontColor, drawerScreen } from "../Common/CommonColors";
import Dashboard from "../components/Dashboard";
import MapView from "../components/MapView";

function CustomDrawerContent(props) {
  const [selectedValue, setSelectedValue] = React.useState("default");

  const { authContext, auth } = React.useContext(AuthContext);
  const { themeContextData, mode } = React.useContext(themeContext);
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prevState) => !prevState);
    if (mode.darkMode) {
      themeContextData.lightMode();
    } else {
      themeContextData.darkMode();
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <Text
            style={{
              color: "black",
            }}
          >
            Logout
          </Text>
        )}
        style={{ marginBottom: 50 }}
        onPress={() => authContext.signOut()}
      />

      <DrawerItem
        label={() => (
          <Text
            style={{
              color: "black",
            }}
          >
            Welcome {auth.userName}
          </Text>
        )}
        style={{ marginBottom: 50 }}
      />
      <Picker
        selectedValue={selectedValue}
        style={{ marginLeft: 10 }}
        // onValueChange={(item) => changeLanguage(item)}
      >
        <Picker.Item
          label="Change Language"
          enabled={false}
          value="default"
        ></Picker.Item>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Norwegian" value="nor" />
      </Picker>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            margin: 16,
            color: "black",
          }}
        >
          Dark Theme
        </Text>
        <Switch
          trackColor="black"
          style={{ width: 40, paddingLeft: 10 }}
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>
    </DrawerContentScrollView>
  );
}
export default function MyDrawer() {
  const { mode } = React.useContext(themeContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: mode.darkMode
            ? drawerScreen.darkmode
            : drawerScreen.lightmode,
        },
        activeTintColor: "red",
        activeBackgroundColor: "#FFA07A",
        inactiveTintColor: "blue",
        inactiveBackgroundColor: "#FFA07A",
        labelStyle: {
          marginLeft: 5,
        },
      }}
    >
      <Drawer.Screen
        options={{
          title: "Dashboard",
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: mode.darkMode
              ? drawerScreen.darkmode
              : drawerScreen.lightmode,
          },
          headerTitleStyle: {
            color: "black",
          },
          drawerLabelStyle: {
            color: "black",
          },
        }}
        name="Todos"
        component={Dashboard}
      />
      <Drawer.Screen
        options={{
          title: "Reminder",
          headerTintColor: "black",
          drawerLabelStyle: { color: "black" },
          headerStyle: {
            backgroundColor: mode.darkMode
              ? drawerScreen.darkmode
              : drawerScreen.lightmode,
          },
        }}
        name="Add Todos"
        component={Reminder}
      />
      <Drawer.Screen
        options={{
          title: "Map View",
          headerTintColor: "black",
          drawerLabelStyle: { color: "black" },
          headerStyle: {
            backgroundColor: mode.darkMode
              ? drawerScreen.darkmode
              : drawerScreen.lightmode,
          },
        }}
        name="Map View"
        component={MapView}
      />
    </Drawer.Navigator>
  );
}
