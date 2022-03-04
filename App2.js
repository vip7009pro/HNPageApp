// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation


// Import Screens
import { LogBox } from 'react-native';
import AccountTab from './Screen/TabScreen/AccountTab';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


const App2 = () => {
  return (
    <AccountTab/>
  );
};

export default App2;