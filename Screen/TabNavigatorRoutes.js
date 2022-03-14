// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
// Import Screens
import AccountTab from './TabScreen/AccountTab';
import DrawerNavigationRoutes from './/DrawerNavigationRoutes';
import HomeDrawer from './DrawerScreens/HomeDrawer';

const Tab = createBottomTabNavigator();

const TabNavigatorRoutes = props => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Tài khoản') {
            iconName = focused ? 'man' : 'man-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Icon name={`md-${iconName}`} type="ionicon" color="black" />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#33AD12',
        tabBarInactiveBackgroundColor: '#fff',
      })}>
      <Tab.Screen
        name="Home"
        component={DrawerNavigationRoutes}
        /* component={HomeDrawer} */
        options={{headerShown: false}}
      />
      {/*  <Tab.Screen
        name="Settings"
        component={SettingScreenStack}
        options={{headerShown: false}}
      /> */}
      <Tab.Screen
        name="Cá nhân"
        component={AccountTab}
        options={{headerShown: false}}        
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorRoutes;
