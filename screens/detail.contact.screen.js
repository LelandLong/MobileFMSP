import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { ListItem, Avatar, Divider } from "@rneui/themed";
import * as Linking from "expo-linking"; // installed via: expo install expo-linking

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

export const DetailContactScreen = ({ navigation, route }) => {
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

  // accordian sections
  const [expandedSectionGeneral, setExpandedSectionGeneral] = useState(true);
  const [expandedSectionEstimates, setExpandedSectionEstimates] =
    useState(false);
  const [expandedSectionInvoices, setExpandedSectionInvoices] = useState(false);
  const [expandedSectionProjects, setExpandedSectionProjects] = useState(false);
  const [expandedSectionToDos, setExpandedSectionToDos] = useState(false);
  const [expandedSectionNotes, setExpandedSectionNotes] = useState(false);
  const [expandedSectionCoworkers, setExpandedSectionCoworkers] =
    useState(false);

  // - - - - - - - - - -

  const onPhoneSelected = (phoneNo) => {
    const formattedUrl = "tel:+1" + phoneNo.replace(/-/gi, "");
    console.log(
      "DetailContactScreen onPhoneSelected, formattedUrl: ",
      formattedUrl
    );

    // test for support first before calling openURL
    Linking.canOpenURL(formattedUrl)
      .then((supported) => {
        if (!supported) {
          console.log(
            "DetailContactScreen onPhoneSelected error - Can't handle formattedUrl: " +
              formattedUrl
          );
        } else {
          return Linking.openURL(formattedUrl);
        }
      })
      .catch((err) =>
        console.error(
          "DetailContactScreen onPhoneSelected error occurred: ",
          err
        )
      );
  };

  // - - - - - - - - - -

  const onEmailSelected = (email) => {
    const formattedUrl = "mailto:" + email;
    console.log(
      "DetailContactScreen onEmailSelected, formattedUrl: ",
      formattedUrl
    );

    // test for support first before calling openURL
    Linking.canOpenURL(formattedUrl)
      .then((supported) => {
        if (!supported) {
          console.log(
            "DetailContactScreen onEmailSelected error - Can't handle formattedUrl: " +
              formattedUrl
          );
        } else {
          return Linking.openURL(formattedUrl);
        }
      })
      .catch((err) =>
        console.error(
          "DetailContactScreen onEmailSelected error occurred: ",
          err
        )
      );
  };

  // - - - - - - - - - -

  const onAddressSelected = (contact) => {
    const url = contact.Primary_Address_calc2;
    const formattedUrl =
      "http://maps.apple.com/?address=" + url.replace(/ /gi, "%20");
    console.log(
      "DetailContactScreen onAddressSelected with formattedUrl: ",
      formattedUrl
    );

    // test for support first before calling openURL
    Linking.canOpenURL(formattedUrl)
      .then((supported) => {
        if (!supported) {
          console.log(
            "DetailContactScreen onAddressSelected error - Can't handle formattedUrl: " +
              formattedUrl
          );
        } else {
          return Linking.openURL(formattedUrl);
        }
      })
      .catch((err) =>
        console.error(
          "DetailContactScreen onAddressSelected error occurred: ",
          err
        )
      );
  };

  // - - - - - - - - - -

  const SectionGeneral = () => {
    return (
      <View>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>General</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionGeneral}
          onPress={() => {
            setExpandedSectionGeneral(!expandedSectionGeneral);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem key={1} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Title</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem key={2} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Account</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Account_Name}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            key={3}
            bottomDivider
            containerStyle={viewStyles}
            onPress={() => onAddressSelected(contact)}
          >
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Address</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: "dodgerblue",
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Primary_Address_calc2}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            key={4}
            bottomDivider
            containerStyle={viewStyles}
            onPress={() => onPhoneSelected(contact.Phone1)}
          >
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Phone</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: "dodgerblue",
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Phone1}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            key={5}
            bottomDivider
            containerStyle={viewStyles}
            onPress={() => onEmailSelected(contact.Email)}
          >
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Email</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: "dodgerblue",
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Email}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  const SectionEstimates = () => {
    return (
      <View>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>
                  Estimates (1)
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionEstimates}
          onPress={() => {
            setExpandedSectionEstimates(!expandedSectionEstimates);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  const SectionInvoices = () => {
    return (
      <View>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>Invoices (1)</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionInvoices}
          onPress={() => {
            setExpandedSectionInvoices(!expandedSectionInvoices);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  const SectionProjects = () => {
    return (
      <View>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>Projects (1)</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionProjects}
          onPress={() => {
            setExpandedSectionProjects(!expandedSectionProjects);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  const SectionToDos = () => {
    return (
      <View>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>To Dos (1)</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionToDos}
          onPress={() => {
            setExpandedSectionToDos(!expandedSectionToDos);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  const SectionNotes = () => {
    return (
      <View>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>Notes (1)</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionNotes}
          onPress={() => {
            setExpandedSectionNotes(!expandedSectionNotes);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  const SectionCoworkers = () => {
    return (
      <View style={{ paddingBottom: 100 }}>
        <Divider style={styles.sectionDivider} />
        <ListItem.Accordion
          containerStyle={styles.sectionText}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={textStyles}>
                  Coworkers (1)
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionCoworkers}
          onPress={() => {
            setExpandedSectionCoworkers(!expandedSectionCoworkers);
          }}
        >
          <ListItem key={0} bottomDivider containerStyle={viewStyles}>
            <ListItem.Content>
              <ListItem.Title style={textStyles}>Name</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title
                right
                style={{
                  color: colors.text,
                  alignItems: "flex-end",
                  textAlign: "right",
                  width: 250,
                }}
              >
                {contact.Name_Full}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.border }}>
      <ScrollView style={styles.list}>
        <View style={styles.avatarContainer}>
          <Avatar size={96} source={contact.Contact_Container_Photo} />
        </View>
        <SectionGeneral />
        <SectionEstimates />
        <SectionInvoices />
        <SectionProjects />
        <SectionToDos />
        <SectionNotes />
        <SectionCoworkers />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 250,
  },
});
