import React, { createContext, useState } from "react";
import { FMS_getToken } from "../FMS/FMS_getToken";
import { FMS_logout } from "../FMS/FMS_logout";
import { FMS_getContacts } from "../FMS/FMS_getContacts";
import { FMS_saveContact } from "../FMS/FMS_saveContact";
import { FMS_createNewContact } from "../FMS/FMS_createNewContact";
import { FMS_deleteContact } from "../FMS/FMS_deleteContact";

// - - - - - - - - - - - - - - - - - - - -

export const ContactsContext = createContext();

// - - - - - - - - - -

export const ContactsContextProvider = ({ children }) => {
  const [blankContact, setBlankContact] = useState({
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
    portalData: {
      "T05l_contacts_ESTIMATES||id_contacts|": [],
      "T05m_contacts_INVOICES||id_contact|": [],
      "T05o_contacts_PROJECTS||id_contact|": [],
      "T05p_contacts_TASK_LIST||id_contact|": [],
      "T05c_contacts_NOTES||id_contact|": [],
      "T05f_contacts_CONTACTS||id_contact|": [],
    },
  });

  const [contacts, setContacts] = useState([]);
  const [editedContactFieldData, setEditedContactFieldData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // - - - - - - - - - -

  const addContact = (newContact) => {
    contacts.push(newContact);
    setContacts(contacts);
    // push to server
    createNewContact(newContact);
  };

  // - - - - - - - - - -

  const removeContact = (index) => {
    const contactRecordId = contacts[index].fieldData["Get|RecordID|"];

    contacts.splice(index, 1);
    setContacts(contacts);
    // push to server
    deleteContact(contactRecordId);
  };

  // - - - - - - - - - -

  const getContacts = () => {
    console.log("ContactsContextProvider getContacts... ");
    setIsLoading(true);
    setErrorMessage("");

    FMS_getToken()
      .then((fmsResult) => {
        // console.log("getContacts FMS_getToken results: ", fmsResult);
        const token = fmsResult.response.token;
        console.log("getContacts FMS_getToken token: ", token);

        FMS_getContacts(token)
          .then((fmsResult) => {
            // console.log(
            //   "getContacts FMS_getContacts result: ",
            //   JSON.stringify(fmsResult)
            // );

            const contacts = fmsResult.response.data;
            setContacts(contacts);
            console.log(
              "getContacts FMS_getContacts contacts: ",
              contacts.length
            );

            FMS_logout(token)
              .then((fmsResult) => {
                console.log("getContacts FMS_logout result: ", fmsResult);
                setIsLoading(false);
              })
              .catch((fmsError) => {
                console.log("getContacts FMS_logout error: ", fmsError);
                setErrorMessage(fmsError);
                alert(fmsError);
                setIsLoading(false);
              });
            //
          })
          .catch((fmsError) => {
            console.log("getContacts FMS_getContacts error: ", fmsError);
            setErrorMessage(fmsError);
            alert(fmsError);
            setIsLoading(false);
          });
        //
      })
      .catch((fmsError) => {
        console.log("getContacts FMS_getToken error: ", fmsError);
        setErrorMessage(fmsError);
        alert(fmsError);
        setIsLoading(false);
      });
  };

  // - - - - - - - - - -

  const saveContact = (contact) => {
    console.log("ContactsContextProvider saveContact... ");
    setIsLoading(true);
    setErrorMessage("");

    FMS_getToken()
      .then((fmsResult) => {
        // console.log("saveContact FMS_getToken results: ", fmsResult);
        const token = fmsResult.response.token;
        console.log("saveContact FMS_getToken token: ", token);

        FMS_saveContact(token, contact)
          .then((fmsResult) => {
            console.log("saveContact FMS_saveContact result: ", fmsResult);

            const message = fmsResult.messages[0].message;
            alert("FileMaker Server: " + message);

            FMS_logout(token)
              .then((fmsResult) => {
                console.log("saveContact FMS_logout result: ", fmsResult);
                setIsLoading(false);
              })
              .catch((fmsError) => {
                console.log("saveContact FMS_logout error: ", fmsError);
                setErrorMessage(fmsError);
                alert(fmsError);
                setIsLoading(false);
              });
            //
          })
          .catch((fmsError) => {
            console.log("saveContact FMS_saveContact error: ", fmsError);
            setErrorMessage(fmsError);
            alert(fmsError);
            setIsLoading(false);
          });
        //
      })
      .catch((fmsError) => {
        console.log("saveContact FMS_getToken error: ", fmsError);
        setErrorMessage(fmsError);
        alert(fmsError);
        setIsLoading(false);
      });
  };

  // - - - - - - - - - -

  const createNewContact = (contact) => {
    console.log("ContactsContextProvider createNewContact... ");
    setIsLoading(true);
    setErrorMessage("");

    FMS_getToken()
      .then((fmsResult) => {
        // console.log("saveContact FMS_getToken results: ", fmsResult);
        const token = fmsResult.response.token;
        console.log("createNewContact FMS_getToken token: ", token);

        FMS_createNewContact(token, contact)
          .then((fmsResult) => {
            console.log(
              "createNewContact FMS_createNewContact result: ",
              fmsResult
            );

            const message = fmsResult.messages[0].message;
            alert("FileMaker Server: " + message);

            FMS_logout(token)
              .then((fmsResult) => {
                console.log("createNewContact FMS_logout result: ", fmsResult);
                setIsLoading(false);
              })
              .catch((fmsError) => {
                console.log("createNewContact FMS_logout error: ", fmsError);
                setErrorMessage(fmsError);
                alert(fmsError);
                setIsLoading(false);
              });
            //
          })
          .catch((fmsError) => {
            console.log(
              "createNewContact FMS_createNewContact error: ",
              fmsError
            );
            setErrorMessage(fmsError);
            alert(fmsError);
            setIsLoading(false);
          });
        //
      })
      .catch((fmsError) => {
        console.log("createNewContact FMS_getToken error: ", fmsError);
        setErrorMessage(fmsError);
        alert(fmsError);
        setIsLoading(false);
      });
  };

  // - - - - - - - - - -

  const deleteContact = (recordId) => {
    console.log("ContactsContextProvider deleteContact... ");
    setIsLoading(true);
    setErrorMessage("");

    FMS_getToken()
      .then((fmsResult) => {
        // console.log("deleteContact FMS_getToken results: ", fmsResult);
        const token = fmsResult.response.token;
        console.log("deleteContact FMS_getToken token: ", token);

        FMS_deleteContact(token, recordId)
          .then((fmsResult) => {
            console.log("deleteContact FMS_deleteContact result: ", fmsResult);

            const message = fmsResult.messages[0].message;
            alert("FileMaker Server: " + message);

            FMS_logout(token)
              .then((fmsResult) => {
                console.log("deleteContact FMS_logout result: ", fmsResult);
                setIsLoading(false);
              })
              .catch((fmsError) => {
                console.log("deleteContact FMS_logout error: ", fmsError);
                setErrorMessage(fmsError);
                alert(fmsError);
                setIsLoading(false);
              });
            //
          })
          .catch((fmsError) => {
            console.log("deleteContact FMS_saveContact error: ", fmsError);
            setErrorMessage(fmsError);
            alert(fmsError);
            setIsLoading(false);
          });
        //
      })
      .catch((fmsError) => {
        console.log("deleteContact FMS_getToken error: ", fmsError);
        setErrorMessage(fmsError);
        alert(fmsError);
        setIsLoading(false);
      });
  };

  // - - - - - - - - - -

  return (
    <ContactsContext.Provider
      value={{
        blankContact,
        contacts,
        setContacts,
        editedContactFieldData,
        setEditedContactFieldData,
        isLoading,
        addContact,
        removeContact,
        getContacts,
        saveContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
