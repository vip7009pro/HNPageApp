// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React, {useState} from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import AccountTab from './TabScreen/AccountTab';
import TableScreen from './DrawerScreens/TableScreen';
import DeliverySearch from './DrawerScreens/KD/Delivery/DeliverySearch';
import DeliveryTable from './DrawerScreens/KD/Delivery/DeliveryTable';
import KDHome from './DrawerScreens/KD/KDHome';
import InspectionHome from './DrawerScreens/INSPECTION/InspectionHome';
import InOutSearch from './DrawerScreens/INSPECTION/InOutSearch/InOutSearch';
import InOutTable from './DrawerScreens/INSPECTION/InOutSearch/InOutTable';
import NewPOForm from './DrawerScreens/KD/Delivery/NewPOForm';
import NewInvoiceForm from './DrawerScreens/KD/Delivery/NewInvoiceForm';
import NewYCSXForm from './DrawerScreens/KD/Delivery/NewYCSXForm';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#a180e8', //Set Header color
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

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#3e9447', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const TableScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="TablesScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#2FABF1', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="TableScreen"
        component={TableScreen}
        options={{
          title: 'TableScreen', //Set Header Title
        }}
      />
      <Stack.Screen
        name="DeliverySearch"
        component={DeliverySearch}
        options={{
          title: 'DeliverySearch', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const KDScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="KDHome"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#2FABF1', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="KDHome"
        component={KDHome}
        options={{
          title: 'Ph??ng Kinh Doanh', //Set Header Title
        }}
      />

      <Stack.Screen
        name="DeliverySearchForm"
        component={DeliverySearch}
        options={{
          title: 'T??m ki???m', //Set Header Title
        }}
      />

      <Stack.Screen
        name="TableScreen"
        component={TableScreen}
        options={{
          title: 'K???t qu??? truy v???n', //Set Header Title
        }}
      />
       <Stack.Screen
        name="NewPOForm"
        component={NewPOForm}
        options={{
          title: 'Th??m PO m???i', //Set Header Title
        }}
      />
       <Stack.Screen
        name="NewInvoiceForm"
        component={NewInvoiceForm}
        options={{
          title: 'Th??m Invoice m???i', //Set Header Title
        }}
      />
       <Stack.Screen
        name="NewYCSXForm"
        component={NewYCSXForm}
        options={{
          title: 'Th??m YCSX m???i', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const INSPECTIONScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="InspectionHome"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#2FABF1', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="InspectionHome"
        component={InspectionHome}
        options={{
          title: 'Ph??ng Ki???m Tra', //Set Header Title
        }}
      />

      <Stack.Screen
        name="InOutSearchForm"
        component={InOutSearch}
        options={{
          title: 'T??m ki???m ki???m tra', //Set Header Title
        }}
      />

      <Stack.Screen
        name="InOutTable"
        component={InOutTable}
        options={{
          title: 'K???t qu??? truy v???n', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="KDScreenStack"
        options={{
          drawerLabel: 'Ph??ng Kinh Doanh',
          drawerLabelStyle: {color: 'yellow'},
        }}
        component={KDScreenStack}
      />
      <Drawer.Screen
        name="INSPECTIONScreenStack"
        options={{
          drawerLabel: 'Ph??ng Ki???m Tra',
          drawerLabelStyle: {color: 'yellow'},
        }}
        component={INSPECTIONScreenStack}
      />

  {/*     <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Home Screen',
          drawerLabelStyle: {color: 'yellow'},
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{
          drawerLabel: 'Setting Screen',
          drawerLabelStyle: {color: 'yellow'},
        }}
        component={SettingScreenStack}
      />    */}  
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
