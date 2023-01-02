import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import { Button } from "@rneui/themed";
// import { Button } from "@rneui/base";
import { ListItem, Avatar, Divider, Input } from "@rneui/themed";
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
  const { contacts, editedContactFieldData, setEditedContactFieldData } =
    useContext(ContactsContext);
  // parameters
  let { contactIndex, editType } = route.params;
  let contact = {
    fieldData: {
      Contact_Container_Photo_Base64: "",
      Name_Full: "",
      Name_First: "",
      Name_Last: "",
      Title: "",
      Account_Name: "",
      Primary_Address_calc2: "",
      Primary_Street1: "",
      Primary_Street2: "",
      Primary_City: "",
      Primary_State_Prov1: "",
      Primary_Postal_Code1: "",
      Primary_Country: "",
      Phone1: "",
      Email: "",
    },
  };
  if (editType == "edit") {
    contact = contacts[contactIndex];
  }

  // colors
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const textStyles: TextStyle[] = [styles.text, { color: colors.text }];

  const [inputFocused, setInputFocused] = useState(false);
  const refInput1 = useRef();
  const refInput2 = useRef();
  const refInput3 = useRef();
  const refInput4 = useRef();
  const refInput5 = useRef();
  const refInput6 = useRef();
  const refInput7 = useRef();
  const refInput8 = useRef();
  const refInput9 = useRef();
  const refInput10 = useRef();
  const refInput11 = useRef();
  const refInput12 = useRef();

  // - - - - - - - - - -

  const cancelTapped = () => {
    console.log("EditContactScreen cancelTapped...");
    navigation.goBack();
  };

  // - - - - - - - - - -

  const doneTapped = () => {
    console.log("EditContactScreen doneTapped...");
    navigation.navigate("DetailContactScreen", {
      contactIndex: contactIndex,
      editType: editType,
      isSaving: true,
    });
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
        <View style={{ paddingBottom: 300 }}>
          <Divider style={styles.sectionDivider} />
          <ListItem key={0} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>First Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput1}
                containerStyle={{
                  width: 275,
                  padding: 0,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Name_First: value,
                    Name_Full: value + " " + editedContactFieldData.Name_Last,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput2.current.focus()}
                value={editedContactFieldData.Name_First}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={1} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Last Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput2}
                containerStyle={{
                  width: 275,
                  padding: 0,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Name_Last: value,
                    Name_Full: editedContactFieldData.Name_First + " " + value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput3.current.focus()}
                value={editedContactFieldData.Name_Last}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={2} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Title</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput3}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Title: value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput4.current.focus()}
                value={editedContactFieldData.Title}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={3} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Account</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput4}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Account_Name: value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput5.current.focus()}
                value={editedContactFieldData.Account_Name}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={4} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Address 1</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput5}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Primary_Street1: value,
                    Primary_Address_calc2:
                      value +
                      "\r" +
                      editedContactFieldData.Primary_City +
                      ", " +
                      editedContactFieldData.Primary_State_Prov1 +
                      " " +
                      editedContactFieldData.Primary_Postal_Code1,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput6.current.focus()}
                value={editedContactFieldData.Primary_Street1}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={5} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Address 2</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput6}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Primary_Street2: value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput7.current.focus()}
                value={editedContactFieldData.Primary_Street2}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={6} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>City</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput7}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Primary_City: value,
                    Primary_Address_calc2:
                      editedContactFieldData.Primary_Street1 +
                      "\r" +
                      value +
                      ", " +
                      editedContactFieldData.Primary_State_Prov1 +
                      " " +
                      editedContactFieldData.Primary_Postal_Code1,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput8.current.focus()}
                value={editedContactFieldData.Primary_City}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={7} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>State</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput8}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Primary_State_Prov1: value,
                    Primary_Address_calc2:
                      editedContactFieldData.Primary_Street1 +
                      "\r" +
                      editedContactFieldData.Primary_City +
                      ", " +
                      value +
                      " " +
                      editedContactFieldData.Primary_Postal_Code1,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput9.current.focus()}
                value={editedContactFieldData.Primary_State_Prov1}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={8} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Postal Code</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput9}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Primary_Postal_Code1: value,
                    Primary_Address_calc2:
                      editedContactFieldData.Primary_Street1 +
                      "\r" +
                      editedContactFieldData.Primary_City +
                      ", " +
                      editedContactFieldData.Primary_State_Prov1 +
                      " " +
                      value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput10.current.focus()}
                value={editedContactFieldData.Primary_Postal_Code1}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={9} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Country</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput10}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Primary_Country: value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput11.current.focus()}
                value={editedContactFieldData.Primary_Country}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={10} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Phone</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput11}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Phone1: value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput12.current.focus()}
                value={editedContactFieldData.Phone1}
              />
            </ListItem.Content>
          </ListItem>
          <ListItem key={11} containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Email</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <Input
                ref={refInput12}
                containerStyle={{
                  width: 275,
                }}
                style={{
                  color: colors.text,
                }}
                textAlign="right"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) =>
                  setEditedContactFieldData((prevState) => ({
                    ...prevState,
                    Email: value,
                  }))
                }
                returnKeyType="next"
                onFocus={() => setInputFocused(true)}
                onEndEditing={() => setInputFocused(false)}
                onSubmitEditing={() => refInput1.current.focus()}
                value={editedContactFieldData.Email}
              />
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  list: {
    flex: 1,
    padding: 10,
  },
  sectionDivider: {
    height: 15,
    backgroundColor: "lightsteelblue",
  },
});
