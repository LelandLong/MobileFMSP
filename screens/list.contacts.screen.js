import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
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

export const ListContactsScreen = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const titleStyles: TextStyle[] = [styles.title, { color: colors.text }];

  const { contacts, isLoading } = useContext(ContactsContext);
  const [forceUpdateValue, setForceUpdateValue] = useState(0);

  // - - - - - - - - - -

  const addTapped = () => {
    console.log("listContacts addTapped...");
    navigation.navigate("EditContactScreen", {
      contactIndex: 0,
      editType: "new",
    });
  };

  // - - - - - - - - - -

  const itemTapped = (index) => {
    console.log("listContacts indexTapped: ", index);
    navigation.navigate("DetailContactScreen", {
      contactIndex: index,
      editType: "",
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

  const useForceUpdate = () => {
    console.log("USEFORCEUPDATE...");
    return () =>
      setForceUpdateValue((forceUpdateValue) => forceUpdateValue + 1);
  };

  // - - - - - - - - - -

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => addTapped()} title="+" />,
    });
  }, [navigation]);

  // - - - - - - - - - -

  useEffect(() => {
    const forceUpdate = useForceUpdate();
  }, [isLoading]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <>
          <View style={[styles.container]}>
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
          <FlatList
            keyExtractor={keyExtractor}
            data={contacts}
            renderItem={renderItem}
          />
        </>
      )}
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
