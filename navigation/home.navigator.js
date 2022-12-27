import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { ListContactsScreen } from "../screens/list.contacts.screen";

// - - - - - - - - - - - - - - - - - - - -

const HomeStack = createNativeStackNavigator();

// - - - - - - - - - -

export const HomeNavigator = () => {
  // - - - - - - - - - -

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <HomeStack.Screen
        name="ListContactsScreen"
        component={ListContactsScreen}
        options={{ title: "Contacts" }}
      />
    </HomeStack.Navigator>
  );
};
