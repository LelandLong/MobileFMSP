import React, { createContext, useState } from "react";
import { FMS_getToken } from "../FMS/FMS_getToken";
import { FMS_logout } from "../FMS/FMS_logout";
import { FMS_getContacts } from "../FMS/FMS_getContacts";
import { FMS_saveContact } from "../FMS/FMS_saveContact";

// - - - - - - - - - - - - - - - - - - - -

export const ContactsContext = createContext();

// - - - - - - - - - -

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [editedContactFieldData, setEditedContactFieldData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    // FMS_getToken()
    //   .then((fmsResult) => {
    //     // console.log("saveContact FMS_getToken results: ", fmsResult);
    //     const token = fmsResult.response.token;
    //     console.log("saveContact FMS_getToken token: ", token);

    //     FMS_saveContact(token, contact)
    //       .then((fmsResult) => {
    //         console.log("saveContact FMS_saveContact result: ", fmsResult);

    //         const message = fmsResult.messages[0].message;
    //         alert("FileMaker Server: " + message);

    //         FMS_logout(token)
    //           .then((fmsResult) => {
    //             console.log("saveContact FMS_logout result: ", fmsResult);
    //             setIsLoading(false);
    //           })
    //           .catch((fmsError) => {
    //             console.log("saveContact FMS_logout error: ", fmsError);
    //             setErrorMessage(fmsError);
    //             alert(fmsError);
    //             setIsLoading(false);
    //           });
    //         //
    //       })
    //       .catch((fmsError) => {
    //         console.log("saveContact FMS_saveContact error: ", fmsError);
    //         setErrorMessage(fmsError);
    //         alert(fmsError);
    //         setIsLoading(false);
    //       });
    //     //
    //   })
    //   .catch((fmsError) => {
    //     console.log("saveContact FMS_getToken error: ", fmsError);
    //     setErrorMessage(fmsError);
    //     alert(fmsError);
    //     setIsLoading(false);
    //   });

    const myTimer = setTimeout(() => {
      setIsLoading(false);
    });
  };

  // - - - - - - - - - -

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        editedContactFieldData,
        setEditedContactFieldData,
        isLoading,
        getContacts,
        saveContact,
        createNewContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
