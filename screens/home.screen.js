import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  FlatList,
} from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import { ContactsContext } from "../contexts/contacts.context";

// - - - - - - - - - - - - - - - - - - - -

const Colors = {
  light: {
    background: "white",
    text: "black",
  },
  dark: {
    background: "black",
    text: "white",
  },
};

// - - - - - - - - - - - - - - - - - - - -

const list = [
  {
    name: "Accounts",
    avatar: require("../assets/Accounts.png"),
  },
  {
    name: "Contacts",
    avatar: require("../assets/Contacts.png"),
  },
  {
    name: "Estimates",
    avatar: require("../assets/Estimates.png"),
  },
  {
    name: "Invoices",
    avatar: require("../assets/Invoices.png"),
  },
  {
    name: "Projects",
    avatar: require("../assets/Projects.png"),
  },
  {
    name: "Products",
    avatar: require("../assets/Products.png"),
  },
  {
    name: "Expenses",
    avatar: require("../assets/Expenses.png"),
  },
  {
    name: "Staff",
    avatar: require("../assets/Staff.png"),
  },
  {
    name: "Assets",
    avatar: require("../assets/Assets.png"),
  },
  {
    name: "Timesheets",
    avatar: require("../assets/Timesheets.png"),
  },
  {
    name: "Tasks",
    avatar: require("../assets/Tasks.png"),
  },
  {
    name: "Calendar",
    avatar: require("../assets/Calendar.png"),
  },
];

// - - - - - - - - - - - - - - - - - - - -

export const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const textStyles: TextStyle[] = [styles.text, { color: colors.text }];

  const { contacts, getContacts, isLoading } = useContext(ContactsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // - - - - - - - - - -

  const onRefresh = (authData) => {
    setIsRefreshing(true);
    getContacts();
  };

  // - - - - - - - - - -

  const itemTapped = (item) => {
    console.log("homeScreen itemTapped: ", item.name);
    if (item.name == "Contacts") {
      navigation.navigate("ListContactsScreen", {
        whichDetail: item.name,
      });
    }
  };

  // - - - - - - - - - -

  const keyExtractor = (item, index) => index.toString();

  // - - - - - - - - - -

  const renderItem = ({ item }) => {
    return (
      <ListItem
        topDivider
        bottomDivider
        containerStyle={viewStyles}
        onPress={() => itemTapped(item)}
      >
        <Avatar size={48} source={item.avatar} />
        {item.name == "Contacts" ? (
          <>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>
                {item.name} ({contacts.length})
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </>
        ) : (
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 14, color: "gray" }}>
                {item.name}
              </ListItem.Title>
            </ListItem.Content>
          </>
        )}
      </ListItem>
    );
  };

  // - - - - - - - - - -

  useEffect(() => {
    if (isRefreshing && !isLoading) {
      setIsRefreshing(false);
    }
  }, [isLoading]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
  },
});
