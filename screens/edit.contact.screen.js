import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import { Button } from "@rneui/themed";
import { ListItem, Avatar, Divider, Input } from "@rneui/themed";
import * as Linking from "expo-linking"; // installed via: expo install expo-linking
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

export const EditContactScreen = ({ navigation, route }) => {
  // parameters
  let { contact } = route.params;

  // colors
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const textStyles: TextStyle[] = [styles.text, { color: colors.text }];

  const { contacts } = useContext(ContactsContext);

  // - - - - - - - - - -

  const cancelTapped = () => {
    console.log("EditContactScreen cancelTapped...");
    navigation.goBack();
  };

  // - - - - - - - - - -

  const doneTapped = () => {
    console.log("EditContactScreen doneTapped...");
  };

  // - - - - - - - - - -

  const SectionGeneral = () => {
    const [inputName, setInputName] = useState(contact.fieldData.Name_Full);
    const [inputTitle, setInputTitle] = useState(contact.fieldData.Title);
    const [inputAccount, setInputAccount] = useState(
      contact.fieldData.Account_Name
    );
    const [inputAddress1, setInputAddress1] = useState(
      contact.fieldData.Primary_Street1
    );
    const [inputAddress2, setInputAddress2] = useState(
      contact.fieldData.Primary_Street2
    );
    const [inputCity, setInputCity] = useState(contact.fieldData.Primary_City);
    const [inputState, setInputState] = useState(
      contact.fieldData.Primary_State_Prov1
    );
    const [inputPostal, setInputPostal] = useState(
      contact.fieldData.Primary_Postal_Code1
    );
    const [inputCountry, setInputCountry] = useState(
      contact.fieldData.Primary_Country
    );
    const [inputPhone, setInputPhone] = useState(contact.fieldData.Phone1);
    const [inputEmail, setInputEmail] = useState(contact.fieldData.Email);

    return (
      <View style={{ paddingBottom: 300 }}>
        <Divider style={styles.sectionDivider} />
        <ListItem key={0} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Name</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputName(value)}
              onEndEditing={() => setInputName(inputName)}
              value={inputName}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={1} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Title</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputTitle(value)}
              onEndEditing={() => setInputTitle(inputTitle)}
              value={inputTitle}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={2} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Account</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputAccount(value)}
              onEndEditing={() => setInputAccount(inputAccount)}
              value={inputAccount}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={3} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Address 1</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputAddress1(value)}
              onEndEditing={() => setInputAddress1(inputAddress1)}
              value={inputAddress1}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={4} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Address 2</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputAddress2(value)}
              onEndEditing={() => setInputAddress2(inputAddress2)}
              value={inputAddress2}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={5} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>City</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputCity(value)}
              onEndEditing={() => setInputCity(inputCity)}
              value={inputCity}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={6} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>State</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputState(value)}
              onEndEditing={() => setInputState(inputState)}
              value={inputState}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={7} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Postal Code</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputPostal(value)}
              onEndEditing={() => setInputPostal(inputPostal)}
              value={inputPostal}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={8} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Country</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputCountry(value)}
              onEndEditing={() => setInputCountry(inputCountry)}
              value={inputCountry}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={9} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Phone</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputPhone(value)}
              onEndEditing={() => setInputPhone(inputPhone)}
              value={inputPhone}
            />
          </ListItem.Content>
        </ListItem>
        <ListItem key={10} bottomDivider containerStyle={viewStyles}>
          <ListItem.Content>
            <ListItem.Title style={textStyles}>Email</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <ListItem.Input
              containerStyle={{
                width: 275,
              }}
              style={{
                color: colors.text,
              }}
              textAlign="right"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => setInputEmail(value)}
              onEndEditing={() => setInputEmail(inputEmail)}
              value={inputEmail}
            />
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  // - - - - - - - - - -

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => cancelTapped()} title="Cancel" />
      ),
      headerRight: () => <Button onPress={() => doneTapped()} title="Done" />,
    });
  }, [navigation]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.border }}>
      <ScrollView style={styles.list}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={96}
            source={{
              uri: `data:image/png;base64,${contact.fieldData.Contact_Container_Photo_Base64}`,
            }}
          />
        </View>
        <SectionGeneral />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  avatarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  list: {
    flex: 1,
    padding: 10,
  },
  sectionDivider: {
    height: 15,
    backgroundColor: "lightsteelblue",
  },
  sectionText: {
    padding: 10,
    fontSize: 14,
    color: "mediumblue",
    backgroundColor: "cornflowerblue",
  },
  rightTitleStyles: {
    alignItems: "flex-end",
    textAlign: "right",
    width: 275,
  },
});
