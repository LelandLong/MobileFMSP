import React, { useContext } from "react";
import { View, Text, StyleSheet, useColorScheme, Button } from "react-native";
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

export const SettingsScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const textStyles: TextStyle[] = [styles.text, { color: colors.text }];

  const { scriptForRandomContact } = useContext(ContactsContext);

  // - - - - - - - - - -

  return (
    <View style={viewStyles}>
      <Text style={textStyles}>Settings Screen</Text>
      <Text style={textStyles}> </Text>
      <Button
        title="Script to Create Random Contact"
        onPress={() => scriptForRandomContact()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
