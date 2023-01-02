import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { ListContactsScreen } from "../screens/list.contacts.screen";
import { DetailContactScreen } from "../screens/detail.contact.screen";
import { EditContactScreen } from "../screens/edit.contact.screen";

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
      <HomeStack.Screen
        name="DetailContactScreen"
        component={DetailContactScreen}
        options={{ title: "Contact" }}
      />
      <HomeStack.Screen
        name="EditContactScreen"
        component={EditContactScreen}
        options={{ title: "Edit Contact" }}
      />
    </HomeStack.Navigator>
  );
};
