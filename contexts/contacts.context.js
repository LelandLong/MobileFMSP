import React, { createContext, useState } from "react";
import { FMS_getToken } from "../FMS/FMS_getToken";
import { FMS_logout } from "../FMS/FMS_logout";
import { FMS_getContacts } from "../FMS/FMS_getContacts";

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

    FMS_getToken()
      .then((fmsResult) => {
        // console.log("getContacts FMS_getToken results: ", fmsResult);
        const token = fmsResult.response.token;
        console.log("getContacts FMS_getToken token: ", token);

        FMS_getContacts(token)
          .then((fmsResult) => {
            // console.log("getContacts FMS_getContacts result: ", fmsResult);

            const contacts = fmsResult.response.data;
            console.log("getContacts FMS_getContacts contacts: ", contacts);

            FMS_logout(token)
              .then((fmsResult) => {
                console.log("getContacts FMS_logout result: ", fmsResult);
                setIsLoading(false);
              })
              .catch((fmsError) => {
                console.log("getContacts FMS_logout error: ", fmsError);
                setIsLoading(false);
              });
            //
          })
          .catch((fmsError) => {
            console.log("getContacts FMS_getContacts error: ", fmsError);
            setIsLoading(false);
          });
        //
      })
      .catch((fmsError) => {
        console.log("getContacts FMS_getToken error: ", fmsError);
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
