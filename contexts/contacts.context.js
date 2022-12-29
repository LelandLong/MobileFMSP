import React, { createContext, useState } from "react";

// - - - - - - - - - - - - - - - - - - - -

export const ContactsContext = createContext();

// - - - - - - - - - -

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState(["Hello Context World"]);
  console.log("ContactsContextProvider instantiated... ");

  // - - - - - - - - - -

  const futureFunction = () => {
    console.log("ContactsContextProvider futureFunction... ");
  };

  // - - - - - - - - - -

  return (
    <ContactsContext.Provider
      value={{
        contacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
