import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import NavigationDrawerHeader from '../Components/NavigationDrawerHeader';
import DrawerMenu from './DrawerMenu';
import InOutSearch from './INSPECTION/InOutSearch/InOutSearch';
import InOutTable from './INSPECTION/InOutSearch/InOutTable';
import InspectionHome from './INSPECTION/InspectionHome';
import DeliverySearch from './KD/Delivery/DeliverySearch';
import NewInvoiceForm from './KD/Delivery/NewInvoiceForm';
import NewPOForm from './KD/Delivery/NewPOForm';
import NewYCSXForm from './KD/Delivery/NewYCSXForm';
import KDHome from './KD/KDHome';
import TableScreen from './TableScreen';

const Stack = createStackNavigator();

const KDScreenStack = ({navigation}) => {
    return (
      <Stack.Navigator
        initialRouteName="KDHome"
        screenOptions={{         
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
            title: 'Phòng Kinh Doanh', //Set Header Title
          }}
        />
  
        <Stack.Screen
          name="DeliverySearchForm"
          component={DeliverySearch}
          options={{
            title: 'Tìm kiếm', //Set Header Title
          }}
        />
  
        <Stack.Screen
          name="TableScreen"
          component={TableScreen}
          options={{
            title: 'Kết quả truy vấn', //Set Header Title
          }}
        />
         <Stack.Screen
          name="NewPOForm"
          component={NewPOForm}
          options={{
            title: 'Thêm PO mới', //Set Header Title
          }}
        />
         <Stack.Screen
          name="NewInvoiceForm"
          component={NewInvoiceForm}
          options={{
            title: 'Thêm Invoice mới', //Set Header Title
          }}
        />
         <Stack.Screen
          name="NewYCSXForm"
          component={NewYCSXForm}
          options={{
            title: 'Thêm YCSX mới', //Set Header Title
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
            title: 'Phòng Kiểm Tra', //Set Header Title
          }}
        />
  
        <Stack.Screen
          name="InOutSearchForm"
          component={InOutSearch}
          options={{
            title: 'Tìm kiếm kiểm tra', //Set Header Title
          }}
        />
  
        <Stack.Screen
          name="InOutTable"
          component={InOutTable}
          options={{
            title: 'Kết quả truy vấn', //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  };


const HomeDrawerStack =({navigation})=> {
    return (
      <Stack.Navigator initialRouteName="KDStack">
        <Stack.Screen name="KDStack" component={KDScreenStack}></Stack.Screen>
        <Stack.Screen name="IPStack" component={INSPECTIONScreenStack}></Stack.Screen>
      </Stack.Navigator>
    );
}
export default function HomeDrawer() {
  return (
    <Stack.Navigator initialRouteName="DrawerMenu">
      <Stack.Screen
        name="KDStack"
        component={KDScreenStack}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="IPStack"
        component={INSPECTIONScreenStack}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="DeliverySearchForm"
        component={DeliverySearch}
        options={{
          title: 'Tìm kiếm', //Set Header Title
        }}
      />

      <Stack.Screen
        name="TableScreen"
        component={TableScreen}
        options={{
          title: 'Kết quả truy vấn', //Set Header Title
        }}
      />
      <Stack.Screen
        name="NewPOForm"
        component={NewPOForm}
        options={{
          title: 'Thêm PO mới', //Set Header Title
        }}
      />
      <Stack.Screen
        name="NewInvoiceForm"
        component={NewInvoiceForm}
        options={{
          title: 'Thêm Invoice mới', //Set Header Title
        }}
      />
      <Stack.Screen
        name="NewYCSXForm"
        component={NewYCSXForm}
        options={{
          title: 'Thêm YCSX mới', //Set Header Title
        }}
      />
      <Stack.Screen
        name="InOutSearchForm"
        component={InOutSearch}
        options={{
          title: 'Tìm kiếm kiểm tra', //Set Header Title
        }}
      />

      <Stack.Screen
        name="InOutTable"
        component={InOutTable}
        options={{
          title: 'Kết quả truy vấn', //Set Header Title
        }}
      />
      <Stack.Screen
        name="DrawerMenu"
        component={DrawerMenu}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}
