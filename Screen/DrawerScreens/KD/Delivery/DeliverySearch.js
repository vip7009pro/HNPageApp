// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ListItem} from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';
import { generalQuery } from '../../../../Api/Api';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import style from 'react-native-datepicker/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input_text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  placeholder: {
    color: 'grey',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  pressableBT: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  labeltext:{
    marginLeft: 10,
    color:'black',
    fontWeight: 'bold'
  }
});


const DeliverySearch = ({navigation}) => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateoption,setdateoption] = useState(1);
  const [frm_date,setfrm_date]= useState(moment().format('YYYY-MM-DD'));
  const [to_date,setto_date]= useState(moment().format('YYYY-MM-DD'));
  const [g_code, setG_CODE]= useState('');
  const [g_name, setG_NAME]= useState('');
  const [cust_name, setCust_Name]= useState('');


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if(dateoption == 1)
    {
      setfrm_date(moment(currentDate).format('YYYY-MM-DD'));
    }
    else
    {
      setto_date(moment(currentDate).format('YYYY-MM-DD'));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (option) => {
    showMode('date');
    setdateoption(option);
  };

 
  const getEmplList = emplname => {
    let insertData = {SEARCHNAME: emplname};
    setIndicator(true);
    setRefreshing(true);
    generalQuery('get_invoice', insertData)
      .then(response => {
        //console.log(response.data.data);
        setEmplList(response.data.data);
        setIndicator(false);
        setRefreshing(false);
        /*  Alert.alert(
        "Thông báo",
        "Tải data thành công",
        [          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      ); */
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    // getEmplList();
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Text style={styles.labeltext}>Code CMS</Text>
        <TextInput
          style={styles.input_text}
          onChangeText={text => {
            setG_CODE(text);
          }}
          placeholder="G_CODE"
          placeholderTextColor={'grey'}></TextInput>
        <Text style={styles.labeltext}>Khách hàng</Text>
        <TextInput
          style={styles.input_text}
          onChangeText={text => {
            setCust_Name(text);
          }}
          placeholder="Customer"
          placeholderTextColor={'grey'}></TextInput>
        <Text style={styles.labeltext}>Code Kinh Doanh</Text>
        <TextInput
          style={styles.input_text}
          onChangeText={text => {
            setG_NAME(text);
          }}
          placeholder="Code KD"
          placeholderTextColor={'grey'}></TextInput>
        <View>
          <View>
            <Text style={styles.labeltext}>Từ ngày</Text>
            <TextInput
              style={styles.input_text}
              onChangeText={() => {
                console.log('a');
              }}
              onFocus={() => {
                showDatepicker(1);
              }}
              value={frm_date.toString()}
              placeholder="Từ ngày"
              placeholderTextColor={'grey'}></TextInput>
            <Text style={styles.labeltext}>Đến ngày</Text>
            <TextInput
              style={styles.input_text}
              onChangeText={() => {
                console.log('a');
              }}
              onFocus={() => {
                showDatepicker(2);
              }}
              value={to_date.toString()}
              placeholder="Tới ngày"
              placeholderTextColor={'grey'}></TextInput>
          </View>
          <View style={{alignItems: 'center'}}>
            <Pressable
              onPress={() => {
                navigation.push('TableScreen', {
                  G_CODE: g_code,
                  G_NAME: g_name,
                  CUST_NAME: cust_name,
                  FROM_DATE: frm_date,
                  TO_DATE: to_date,
                });
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                },
                styles.pressableBT,
              ]}>
              <Text style={{color: 'black', fontSize: 20}}>Tra</Text>
            </Pressable>
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default DeliverySearch;
