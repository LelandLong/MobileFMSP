import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

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
    Name_Initial: "Ryan Alvarez Smith",
    Name_Full: "Ryan Alvarez Smith",
    Account_Name: "Richard Carlton Consulting",
    Primary_City: "Charleston",
    Primary_State_Prov1: "SC",
    Title: "Accountant",
    Contact_Container_Photo: require("../assets/Accounts.png"),
    Followup_Days_Number: 5,
  },
  {
    Name_Initial: "Ryan Alvarez Smith",
    Name_Full: "Ryan Alvarez Smith",
    Account_Name: "Richard Carlton Consulting",
    Primary_City: "Charleston",
    Primary_State_Prov1: "SC",
    Title: "Accountant",
    Contact_Container_Photo: require("../assets/Accounts.png"),
    Followup_Days_Number: 5,
  },
  {
    Name_Initial: "Ryan Alvarez Smith",
    Name_Full: "Ryan Alvarez Smith",
    Account_Name: "Richard Carlton Consulting",
    Primary_City: "Charleston",
    Primary_State_Prov1: "SC",
    Title: "Accountant",
    Contact_Container_Photo: require("../assets/Accounts.png"),
    Followup_Days_Number: 5,
  },
  {
    Name_Initial: "Ryan Alvarez Smith",
    Name_Full: "Ryan Alvarez Smith",
    Account_Name: "Richard Carlton Consulting",
    Primary_City: "Charleston",
    Primary_State_Prov1: "SC",
    Title: "Accountant",
    Contact_Container_Photo: require("../assets/Accounts.png"),
    Followup_Days_Number: 5,
  },
];

// - - - - - - - - - - - - - - - - - - - -

export const ListContactsScreen = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const titleStyles: TextStyle[] = [styles.title, { color: colors.text }];

  // - - - - - - - - - -

  const itemTapped = (item) => {
    console.log("listContacts itemTapped: ", item.Account_Name);
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
        <Avatar size={48} source={item.Contact_Container_Photo} />
        <ListItem.Content>
          <ListItem.Title style={titleStyles}>
            {item.Name_Initial}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {item.Account_Name}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
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
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    color: "gray",
    fontSize: 14,
  },
});
