import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { Button } from "@rneui/themed";
import { ListItem, Avatar, Divider } from "@rneui/themed";
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

export const DetailContactScreen = ({ navigation, route }) => {
  const {
    isLoading,
    contacts,
    editedContactFieldData,
    setEditedContactFieldData,
    saveContact,
  } = useContext(ContactsContext);
  // parameters
  const { contactIndex, isSaving } = route.params;
  const contact = contacts[contactIndex];
  // console.log("DetailContactScreen launched, isSaving: ", isSaving);

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

  const editTapped = () => {
    setEditedContactFieldData(contact.fieldData);
    console.log("DetailContactScreen editTapped, contactIndex: ", contactIndex);
    navigation.navigate("EditContactScreen", {
      contactIndex: contactIndex,
    });
  };

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
    const url = contact.fieldData.Primary_Address_calc2;
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
                  width: 275,
                }}
              >
                {contact.fieldData.Name_Full}
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
                  width: 275,
                }}
              >
                {contact.fieldData.Title}
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
                  width: 275,
                }}
              >
                {contact.fieldData.Account_Name}
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
                  width: 275,
                }}
              >
                {contact.fieldData.Primary_Address_calc2}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            key={4}
            bottomDivider
            containerStyle={viewStyles}
            onPress={() => onPhoneSelected(contact.fieldData.Phone1)}
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
                  width: 275,
                }}
              >
                {contact.fieldData.Phone1}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            key={5}
            bottomDivider
            containerStyle={viewStyles}
            onPress={() => onEmailSelected(contact.fieldData.Email)}
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
                  width: 275,
                }}
              >
                {contact.fieldData.Email}
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
                  Estimates (
                  {
                    contact.portalData["T05l_contacts_ESTIMATES||id_contacts|"]
                      .length
                  }
                  )
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionEstimates}
          onPress={() => {
            setExpandedSectionEstimates(!expandedSectionEstimates);
          }}
        >
          {contact.portalData["T05l_contacts_ESTIMATES||id_contacts|"].map(
            (element, index) => (
              <ListItem key={index} bottomDivider containerStyle={viewStyles}>
                <ListItem.Content>
                  <ListItem.Title style={textStyles}>
                    {
                      element[
                        "T05l_contacts_ESTIMATES||id_contacts|::display_billing_name"
                      ]
                    }
                  </ListItem.Title>
                  <ListItem.Subtitle style={textStyles}>
                    {
                      element[
                        "T05l_contacts_ESTIMATES||id_contacts|::BillTo_Company"
                      ]
                    }
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {
                      element[
                        "T05l_contacts_ESTIMATES||id_contacts|::Date_Estimate"
                      ]
                    }
                  </ListItem.Title>
                  <ListItem.Subtitle right style={textStyles}>
                    {element[
                      "T05l_contacts_ESTIMATES||id_contacts|::Order_Total"
                    ].toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )}
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
                <ListItem.Title style={textStyles}>
                  Invoices (
                  {
                    contact.portalData["T05m_contacts_INVOICES||id_contact|"]
                      .length
                  }
                  )
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionInvoices}
          onPress={() => {
            setExpandedSectionInvoices(!expandedSectionInvoices);
          }}
        >
          {contact.portalData["T05m_contacts_INVOICES||id_contact|"].map(
            (element, index) => (
              <ListItem key={index} bottomDivider containerStyle={viewStyles}>
                <ListItem.Content>
                  <ListItem.Title style={textStyles}>
                    {
                      element[
                        "T05m_contacts_INVOICES||id_contact|::display_bill_name"
                      ]
                    }
                  </ListItem.Title>
                  <ListItem.Subtitle style={textStyles}>
                    {
                      element[
                        "T05m_contacts_INVOICES||id_contact|::BillTo_Company"
                      ]
                    }
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {
                      element[
                        "T05m_contacts_INVOICES||id_contact|::Date_Invoice"
                      ]
                    }
                  </ListItem.Title>
                  <ListItem.Subtitle right style={textStyles}>
                    {element[
                      "T05m_contacts_INVOICES||id_contact|::Order_Total_Price"
                    ].toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )}
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
                <ListItem.Title style={textStyles}>
                  Projects (
                  {
                    contact.portalData["T05o_contacts_PROJECTS||id_contact|"]
                      .length
                  }
                  )
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionProjects}
          onPress={() => {
            setExpandedSectionProjects(!expandedSectionProjects);
          }}
        >
          {contact.portalData["T05o_contacts_PROJECTS||id_contact|"].map(
            (element, index) => (
              <ListItem key={index} bottomDivider containerStyle={viewStyles}>
                <ListItem.Content>
                  <ListItem.Title style={textStyles}>
                    {
                      element[
                        "T05o_contacts_PROJECTS||id_contact|::Project_Name"
                      ]
                    }
                  </ListItem.Title>
                  <ListItem.Subtitle style={textStyles}>
                    {
                      element[
                        "T05o_contacts_PROJECTS||id_contact|::Account_Name"
                      ]
                    }
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {element["T05o_contacts_PROJECTS||id_contact|::Status"]}
                  </ListItem.Title>
                  <ListItem.Subtitle right style={textStyles}>
                    {element["T05o_contacts_PROJECTS||id_contact|::Category"]}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )}
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
                <ListItem.Title style={textStyles}>
                  To Dos (
                  {
                    contact.portalData["T05p_contacts_TASK_LIST||id_contact|"]
                      .length
                  }
                  )
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionToDos}
          onPress={() => {
            setExpandedSectionToDos(!expandedSectionToDos);
          }}
        >
          {contact.portalData["T05p_contacts_TASK_LIST||id_contact|"].map(
            (element, index) => (
              <ListItem key={index} bottomDivider containerStyle={viewStyles}>
                <ListItem.Content>
                  <ListItem.Title style={textStyles}>
                    {element["T05p_contacts_TASK_LIST||id_contact|::Item"]}
                  </ListItem.Title>
                  <ListItem.Subtitle style={textStyles}>
                    {
                      element[
                        "T05p_contacts_TASK_LIST||id_contact|::Staff_Name"
                      ]
                    }
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {element["T05p_contacts_TASK_LIST||id_contact|::Status"]}
                  </ListItem.Title>
                  <ListItem.Subtitle right style={textStyles}>
                    Due:{" "}
                    {element["T05p_contacts_TASK_LIST||id_contact|::Date_Due"]}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )}
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
                <ListItem.Title style={textStyles}>
                  Notes (
                  {
                    contact.portalData["T05c_contacts_NOTES||id_contact|"]
                      .length
                  }
                  )
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionNotes}
          onPress={() => {
            setExpandedSectionNotes(!expandedSectionNotes);
          }}
        >
          {contact.portalData["T05c_contacts_NOTES||id_contact|"].map(
            (element, index) => (
              <ListItem key={index} bottomDivider containerStyle={viewStyles}>
                <ListItem.Content>
                  <ListItem.Title style={textStyles}>
                    {element["T05c_contacts_NOTES||id_contact|::Note_Subject"]}
                  </ListItem.Title>
                  <ListItem.Subtitle style={textStyles}>
                    {element["T05c_contacts_NOTES||id_contact|::Text"]}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {element["T05c_contacts_NOTES||id_contact|::Date"]}
                  </ListItem.Title>
                  <ListItem.Subtitle right style={textStyles}>
                    {element["T05c_contacts_NOTES||id_contact|::Note_Type"]}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )}
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
                  Coworkers (
                  {
                    contact.portalData["T05f_contacts_CONTACTS||id_contact|"]
                      .length
                  }
                  )
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedSectionCoworkers}
          onPress={() => {
            setExpandedSectionCoworkers(!expandedSectionCoworkers);
          }}
        >
          {contact.portalData["T05f_contacts_CONTACTS||id_contact|"].map(
            (element, index) => (
              <ListItem key={index} bottomDivider containerStyle={viewStyles}>
                <ListItem.Content>
                  <ListItem.Title style={textStyles}>
                    {element["T05f_contacts_CONTACTS||id_contact|::Name_Full"]}
                  </ListItem.Title>
                  <ListItem.Subtitle style={textStyles}>
                    {element["T05f_contacts_CONTACTS||id_contact|::Title"]}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {element["T05f_contacts_CONTACTS||id_contact|::Phone1"]}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    right
                    style={{
                      color: colors.text,
                      alignItems: "flex-end",
                      textAlign: "right",
                      width: 275,
                    }}
                  >
                    {element["T05f_contacts_CONTACTS||id_contact|::Email"]}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          )}
        </ListItem.Accordion>
      </View>
    );
  };

  // - - - - - - - - - -

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => editTapped()} title="Edit" />,
    });
    if (isSaving) {
      contact["fieldData"] = editedContactFieldData;
      navigation.setParams({
        contactIndex: contactIndex,
        isSaving: false,
      });
      saveContact(contact);
    }
  }, [navigation, route.params]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.border }}>
      {isLoading ? (
        <>
          <View style={[styles.container]}>
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
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
            <SectionEstimates />
            <SectionInvoices />
            <SectionProjects />
            <SectionToDos />
            <SectionNotes />
            <SectionCoworkers />
          </ScrollView>
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
