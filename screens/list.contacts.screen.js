import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
  Button,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
// import { Button } from "@rneui/themed";
import { ListItem, Avatar } from "@rneui/themed";
import { ContactsContext } from "../contexts/contacts.context";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

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
  const [isSwiping, setIsSwiping] = useState(false);

  // - - - - - - - - - -

  const onDeletePress = (index) => {
    //
    // - - - - - - - - - -

    const deleteItem = (index) => {
      console.log("onDeletePress deleteItem index: ", index);
    };

    // - - - - - - - - - -

    Alert.alert(
      "Alert",
      `Are you sure you want to delete this Contact [${index}]?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("onDeletePress Cancel Pressed..."),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteItem(index) },
      ]
    );
  };

  // - - - - - - - - - -

  const renderRightActions = (index) => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => onDeletePress(index)}
      >
        <Text style={styles.actionText}>Delete</Text>
      </RectButton>
    );
  };

  // - - - - - - - - - -

  const renderRightOpen = (index) => {
    console.log("swiped left, Delete button revealed, index: ", index);
    setIsSwiping(true);
  };

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
    if (isSwiping) {
      // console.log("itemTapped isSwiping, no tap, isSwiping=false");
      setIsSwiping(false);
      //
    } else {
      console.log("listContacts indexTapped: ", index);
      navigation.navigate("DetailContactScreen", {
        contactIndex: index,
        editType: "",
        isSaving: false,
      });
    }
  };

  // - - - - - - - - - -

  const keyExtractor = (item, index) => index.toString();

  // - - - - - - - - - -

  const renderItem = ({ item, index }) => {
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(index)}
        onSwipeableOpen={() => renderRightOpen(index)}
      >
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
      </Swipeable>
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
        <FlatList
          keyExtractor={keyExtractor}
          data={contacts}
          renderItem={renderItem}
        />
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
  actionText: {
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
