import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Button } from "@rneui/base";

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

export const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const viewStyles: ViewStyle[] = [
    styles.container,
    { backgroundColor: colors.background },
  ];
  const textStyles: TextStyle[] = [styles.text, { color: colors.text }];

  // - - - - - - - - - -

  return (
    <View style={viewStyles}>
      <Text style={textStyles}>Home Screen</Text>
      <Text style={textStyles}> </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("DetailsScreen")}
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
