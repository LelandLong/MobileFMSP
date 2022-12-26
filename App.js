import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppNavigator } from "./navigation/app.navigator";

// - - - - - - - - - - - - - - - - - - - -

const Tab = createBottomTabNavigator();

export default function App() {
  return <AppNavigator />;
}
