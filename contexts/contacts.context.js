import React, { createContext, useState } from "react";

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

    // do the work

    const myTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
