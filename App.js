import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppNavigator } from "./navigation/app.navigator";
import { ContactsContextProvider } from "./contexts/contacts.context";

// - - - - - - - - - - - - - - - - - - - -

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ContactsContextProvider>
      <AppNavigator />
    </ContactsContextProvider>
  );
}
