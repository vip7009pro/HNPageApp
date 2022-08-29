// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React, { useEffect } from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import { LogBox } from 'react-native';
import TabNavigatorRoutes from './Screen/TabNavigatorRoutes';
import codePush from "react-native-code-push";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(()=>{
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
  });
  },[]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">        
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}         
          options={{headerShown: false}}
        />      
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />       
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={TabNavigatorRoutes}         
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
/* export default codePush(codePushOptions)(App); */