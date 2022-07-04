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

import {generalQuery} from '../../../../Api/Api';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';

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
  labeltext: {
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  checkbox: {
    alignSelf: 'center',
  },
});

const InOutSearch = ({route, navigation}) => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateoption, setdateoption] = useState(1);
  const [frm_date, setfrm_date] = useState(moment().format('YYYY-MM-DD'));
  const [to_date, setto_date] = useState(moment().format('YYYY-MM-DD'));
  const [g_code, setG_CODE] = useState('');
  const [g_name, setG_NAME] = useState('');
  const [cust_name, setCust_Name] = useState('');
  const [empl_name, setempl_name] = useState('');
  const [prod_type, setprod_type] = useState('');
  const [po_no, setpo_no] = useState('');
  const [alltime, setalltime] = useState(false);

  const options = route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (dateoption == 1) {
      setfrm_date(moment(currentDate).format('YYYY-MM-DD'));
    } else {
      setto_date(moment(currentDate).format('YYYY-MM-DD'));
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = option => {
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

  const gradientHeight = 700;
  const gradientBackground = 'green';
  const data = Array.from({length: gradientHeight});

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#C5F07B'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Button
            onPress={() => {
              navigation.navigate('InOutTable', {
                OPTIONS: options.options,
                G_CODE: g_code,
                G_NAME: g_name,
                CUST_NAME: cust_name,
                FROM_DATE: frm_date,
                TO_DATE: to_date,
                EMPL_NAME: empl_name,
                PROD_TYPE: prod_type,
                PO_NO: po_no,
                ALLTIME: alltime,
              });
            }}
            title="Tra data"
            color={'#0062EF'}></Button>
        </View>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <View style={{width: '50%'}}>
              <Text style={styles.labeltext}>Phân loại hàng</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setprod_type(text);
                }}
                placeholder="Loại hàng"
                placeholderTextColor={'grey'}></TextInput>

              <Text style={styles.labeltext}>Số YCSX</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setpo_no(text);
                }}
                placeholder="Số YCSX"
                placeholderTextColor={'grey'}></TextInput>

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
            <View style={{width: '50%'}}>
              <Text style={styles.labeltext}>Code CMS</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setG_CODE(text);
                }}
                placeholder="Code ERP CMS"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Khách hàng</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setCust_Name(text);
                }}
                placeholder="Tên khách hàng"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Code Kinh Doanh</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setG_NAME(text);
                }}
                placeholder="Code Kinh Doanh"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>PIC Kinh Doanh</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setempl_name(text);
                }}
                placeholder="Tên nhân viên kinh doanh"
                placeholderTextColor={'grey'}></TextInput>
            </View>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <CheckBox
              disabled={false}
              value={alltime}
              onValueChange={newValue => setalltime(newValue)}
            />
            <Text style={styles.labeltext}>All time</Text>
          </View>
        </ScrollView>
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
      </SafeAreaView>
    </View>
  );
};
export default InOutSearch;
