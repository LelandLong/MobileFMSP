import React, { createContext, useState } from "react";
import { getToken } from "../FMS/FMS_getToken";

// - - - - - - - - - - - - - - - - - - - -

export const ContactsContext = createContext();

// - - - - - - - - - -

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // - - - - - - - - - -

  const getContacts = () => {
    console.log("ContactsContextProvider getContacts... ");
    setIsLoading(true);

    getToken()
      .then((fmsResult) => {
        console.log("getContacts getToken results: ", fmsResult);
        setIsLoading(false);
      })
      .catch((fmsError) => {
        console.log("getContacts getToken error: ", fmsError);
        setIsLoading(false);
      });
  };

  // - - - - - - - - - -

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isLoading,
        getContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
