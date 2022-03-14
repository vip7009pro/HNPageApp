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

import LinearGradient from 'react-native-linear-gradient';
import {generalQuery} from '../../../../Api/Api';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';



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
  optionButtonStyle: {
    backgroundColor: '#7CF32A',
    width: 100,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  optionButtonText: {
    color: 'black',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const NewInvoiceForm = ({route, navigation}) => {
  const po_item = route.params;
  const [user_id, setUserId] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateoption, setdateoption] = useState(1);
  const [delivery_date, setdelivery_date] = useState(moment().format('YYYY-MM-DD'));
  const [rd_date, setrd_date] = useState(moment().format('YYYY-MM-DD'));
  const [g_code, setG_CODE] = useState(po_item.G_CODE);
  const [g_name, setG_NAME] = useState(po_item.G_NAME);
  const [cust_name, setCust_Name] = useState(po_item.CUST_NAME_KD);  
  const [prod_type, setprod_type] = useState('');
  const [po_no, setpo_no] = useState(po_item.PO_NO);  
  const [cust_cd, setcust_cd] = useState(po_item.CUST_CD);
  const [prod_price, setprod_price] = useState(po_item.PROD_PRICE);
  const [buttonOption, setbuttonOption] = useState(0);
  const [listcustomer, setlistcustomer] = useState('');
  const [listcode, setlistcode] = useState('');
  const [delivery_qty, setdelivery_qty] = useState(0);
  const [empl_no, setempl_no]= useState(po_item.EMPL_NO);
  

  const getuserid = () => {
    AsyncStorage.getItem('user_id')
      .then(value => {
        // userid = JSON.parse(JSON.parse(value).userInfo)[0];
        let result = JSON.parse(JSON.parse(value).userInfo)[0];
        setUserId(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (dateoption == 1) {
      setdelivery_date(moment(currentDate).format('YYYY-MM-DD'));
    } else {
      setrd_date(moment(currentDate).format('YYYY-MM-DD'));
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

  const insertnewInvoice = () => {
    let insertData = {
      CUST_CD: cust_cd,
      G_CODE: g_code,
      PO_NO: po_no,
      DELIVERY_DATE: delivery_date,
      DELIVERY_QTY: delivery_qty,
      EMPL_NO: empl_no
    };
    console.log(insertData);
    setIndicator(true);
    setRefreshing(true);
    generalQuery('insert_invoice', insertData)
      .then(response => {
        console.log(response.data.tk_status);
        //setEmplList(response.data.data);
        if(response.data.tk_status=='OK')
        {
          Alert.alert("Thêm Invoice mới thành công !");
        }
        else
        {
          Alert.alert("Thêm Invoice mới thất bại ! " + response.data.message );
        }        
        setIndicator(false);
        setRefreshing(false);
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getlistcode_customer = () => {
    let insertData = {};

    generalQuery('get_listcode', insertData)
      .then(response => {
        //console.log(response.data.data)
        setlistcode(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });

    generalQuery('get_listcustomer', insertData)
      .then(response => {
        //console.log(response.data.data)
        setlistcustomer(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    // getEmplList();
    getuserid();
    getlistcode_customer();
  }, []);

  const gradientHeight = 700;
  const gradientBackground = 'green';
  const data = Array.from({length: gradientHeight});

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#ECD98D'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <Button onPress={() => {insertnewInvoice();}} title="Thêm Invoice mới" color={'#49C016'} />
        </View>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <View style={{width: '50%'}}>
              <Text style={styles.labeltext}>Khách hàng</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setprod_type(text);
                }}
                value={cust_name}
                placeholder="Tên khách hàng"
                placeholderTextColor={'grey'}></TextInput>

              <Text style={styles.labeltext}>Số PO</Text>
              <TextInput
                value={po_no}
                style={styles.input_text}
                onChangeText={text => {
                  setpo_no(text);
                }}
                placeholder="PO No"
                placeholderTextColor={'grey'}></TextInput>

              <Text style={styles.labeltext}>Ngày giao hàng</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={() => {
                  console.log('a');
                }}
                onFocus={() => {
                  showDatepicker(1);
                }}
                value={delivery_date.toString()}
                placeholder="Ngày giao hàng"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Mã nhân viên</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={() => {
                  console.log('a');
                }}                
                value={empl_no}
                placeholder="Mã nhân viên"
                placeholderTextColor={'grey'}></TextInput>
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.labeltext}>Code CMS</Text>
              <TextInput
                value={g_code}
                style={styles.input_text}
                onChangeText={text => {
                  setG_CODE(text);
                }}
                placeholder="Code ERP CMS"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Đơn giá</Text>
              <TextInput
                value={prod_price.toString()}
                style={styles.input_text}
                onChangeText={text => {
                  setprod_price(text);
                }}
                placeholder="Đơn giá"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Code Kinh Doanh</Text>
              <TextInput
                value={g_name}
                style={styles.input_text}
                onChangeText={text => {
                  setG_NAME(text);
                }}
                placeholder="Code Kinh Doanh"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Số lượng giao hàng</Text>
              <TextInput
                keyboardType='numeric'
                value={delivery_qty.toString()}
                style={styles.input_text}
                onChangeText={text => {
                  setdelivery_qty(text);
                }}
                placeholder="Số lượng giao hàng"
                placeholderTextColor={'grey'}></TextInput>
            </View>
          </View>
        </ScrollView>

        {buttonOption != 0 ? (
          <SearchableDropdown
            onTextChange={text => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={item => {
              if (buttonOption == 1) {
                setCust_Name(item.name);
                setcust_cd(item.id);
              } else {
                setG_NAME(item.name);
                setG_CODE(item.id);
                setprod_price(item.PROD_LAST_PRICE);
              }
              setbuttonOption(0);
            }}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{padding: 5}}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
              color: 'blue',
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              //text style of a single dropdown item
              color: 'black',
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: '60%',
            }}
            items={buttonOption == 1 ? listcustomer : listcode}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="placeholder"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            listProps={{
              nestedScrollEnabled: false,
            }}
          />
        ) : (
          <View></View>
        )}

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
export default NewInvoiceForm;
