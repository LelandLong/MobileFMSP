import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  useColorScheme,
} from "react-native";
// import { Button } from "@rneui/themed";
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

// const list = [
//   {
//     Name_Initial: "Ryan Alvarez Smith",
//     Name_Full: "Ryan Alvarez Smith",
//     Account_Name: "Richard Carlton Consulting",
//     Primary_Address_calc2: "123 Pitt St. Mt. Pleasant, SC 29464",
//     Primary_City: "Charleston",
//     Primary_State_Prov1: "SC",
//     Phone1: "8438179277",
//     Email: "ryan@me.com",
//     Title: "Accountant",
//     Contact_Container_Photo: require("../assets/Accounts.png"),
//     Followup_Days_Number: 5,
//   },
//   {
//     Name_Initial: "Alvarez Ryan Smith",
//     Name_Full: "Alvarez Ryan Smith",
//     Account_Name: "Staff",
//     Primary_Address_calc2: "123 Pitt St. Mt. Pleasant, SC 29464",
//     Primary_City: "Summerville",
//     Primary_State_Prov1: "SC",
//     Phone1: "8438179277",
//     Email: "alvarez@me.com",
//     Title: "Clerk",
//     Contact_Container_Photo: require("../assets/Staff.png"),
//     Followup_Days_Number: 3,
//   },
//   {
//     Name_Initial: "Smith Ryan Alvarez",
//     Name_Full: "Smith Ryan Alvarez",
//     Account_Name: "McD's",
//     Primary_Address_calc2: "123 Pitt St. Mt. Pleasant, SC 29464",
//     Primary_City: "Columbia",
//     Primary_State_Prov1: "SC",
//     Phone1: "8438179277",
//     Email: "smith@me.com",
//     Title: "Hostess",
//     Contact_Container_Photo: require("../assets/Tasks.png"),
//     Followup_Days_Number: 6,
//   },
//   {
//     Name_Initial: "Smith Smith Smith",
//     Name_Full: "Smith Smith Smith",
//     Account_Name: "ABC Widgets",
//     Primary_Address_calc2: "123 Pitt St. Mt. Pleasant, SC 29464",
//     Primary_City: "Mt. Pleasant",
//     Primary_State_Prov1: "SC",
//     Phone1: "8438179277",
//     Email: "smithsmithsmith@me.com",
//     Title: "Chef",
//     Contact_Container_Photo: require("../assets/Assets.png"),
//     Followup_Days_Number: 2,
//   },
// ];

// - - - - - - - - - - - - - - - - - - - -

export const ListContactsScreen = ({ navigation, route }) => {
  // parameters
  let { whichDetail } = route.params;

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const titleStyles: TextStyle[] = [styles.title, { color: colors.text }];

  const { contacts } = useContext(ContactsContext);

  // - - - - - - - - - -

  const addTapped = () => {
    console.log("listContacts addTapped...");
  };

  // - - - - - - - - - -

  const itemTapped = (index) => {
    console.log("listContacts indexTapped: ", index);
    navigation.navigate("DetailContactScreen", {
      contactIndex: index,
      isSaving: false,
    });
  };

  // - - - - - - - - - -

  const keyExtractor = (item, index) => index.toString();

  // - - - - - - - - - -

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        topDivider
        bottomDivider
        containerStyle={viewStyles}
        onPress={() => itemTapped(index)}
      >
        <Avatar
          size={48}
          source={{
            uri: `data:image/png;base64,${item.fieldData.Contact_Container_Photo_Base64}`,
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={titleStyles}>
            {item.fieldData.Name_Full}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {item.fieldData.Account_Name}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  // - - - - - - - - - -

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => addTapped()} title="+" />,
    });
  }, [navigation]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={contacts}
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
