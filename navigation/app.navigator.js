import React, { useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeNavigator } from "./home.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { ContactsContext } from "../contexts/contacts.context";

// - - - - - - - - - - - - - - - - - - - -

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Settings: "settings",
};

// - - - - - - - - - -

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
    headerShown: false,
  };
};

export const AppNavigator = () => {
  const colorScheme = useColorScheme();
  // console.log("AppNavigator colorScheme: ", colorScheme);

  const [initialRefresh, setInitialRefresh] = useState(false);
  const { getContacts } = useContext(ContactsContext);

  // NOTE: had to change app.json - expo.userInterfaceStyle: "light"
  //           to change app.json - expo.userInterfaceStyle: "automatic"
  //
  //       had to change app.json - expo.ios
  //                        added - expo.ios.userInterfaceStyle: "automatic"
  //
  //       had to change app.json - expo.android
  //                        added - expo.android.userInterfaceStyle: "automatic"
  //

  // - - - - - - - - - -

  useEffect(() => {
    console.log("appNavigator.useEffect[] triggered...");
    if (!initialRefresh) {
      setInitialRefresh(true);
      getContacts();
    }
  }, []);

  // - - - - - - - - - -

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        screenOptions={createScreenOptions}
      >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
