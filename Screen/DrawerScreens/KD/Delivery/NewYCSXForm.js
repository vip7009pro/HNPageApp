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
import SweetAlert from 'react-native-sweet-alert';

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
    backgroundColor: '#F08C53',
    width: 100,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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

const NewYCSXForm = ({route, navigation}) => {
  const [user_id, setUserId] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateoption, setdateoption] = useState(1);
  const [delivery_date, setdelivery_date] = useState(
    moment().format('YYYYMMDD'),
  );
  const [remark, setremark] = useState('');
  const [g_code, setG_CODE] = useState('');
  const [g_name, setG_NAME] = useState('');
  const [cust_name, setCust_Name] = useState('');
  const [prod_type, setprod_type] = useState('');
  const [loaisx, setloaisx] = useState('ETC');
  const [loaisx_code, setloaisx_code] = useState('03');
  const [cust_cd, setcust_cd] = useState('');
  const [loaixh_code, setloaixh_code] = useState('02');
  const [loaixh, setloaixh] = useState('SK');
  const [buttonOption, setbuttonOption] = useState(0);
  const [listcustomer, setlistcustomer] = useState('');
  const [listcode, setlistcode] = useState('');
  const [request_qty, setrequest_qty] = useState(0);
  const [prod_request_no, setprod_request_no] = useState('');

  const options = route.params;

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
      setdelivery_date(moment(currentDate).format('YYYYMMDD'));
    } else {
      setremark(moment(currentDate).format('YYYYMMDD'));
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

  const monthArray = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
  ];
  const dayArray = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
  ];

  const prod_request_no_generate = () => {
    if (g_code == '' || cust_cd == '' || request_qty == 0) {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Thông báo',
          subTitle: 'Không được để trống thông tin',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'error',
          cancellable: true,
        },
        callback => console.log('callback'),
      );
    } else {
      let insertData = {};
      generalQuery('get_last_prod_request_no', insertData)
        .then(response => {
          console.log(response.data.data[0].PROD_REQUEST_NO);
          let last_seq_no = response.data.data[0].PROD_REQUEST_NO.substring(
            3,
            7,
          );
          let last_header = response.data.data[0].PROD_REQUEST_NO.substring(
            0,
            3,
          );
          let nex_seq_no = String(parseInt(last_seq_no) + 1).padStart(4, '0');
          let today_header =
            new Date().getFullYear().toString().substring(2, 3) +
            '' +
            monthArray[new Date().getUTCMonth()] +
            '' +
            dayArray[new Date().getUTCDate() - 1];
          let next_prod_request_no = '';
          if (today_header != last_header) {
            next_prod_request_no = today_header + '0001';
          } else {
            next_prod_request_no = last_header + nex_seq_no;
          }

          const ycsx_data = {
            PROD_REQUEST_DATE:
              new Date().getUTCFullYear() +
              '' +
              String(new Date().getUTCMonth() + 1).padStart(2, '0') +
              String(new Date().getUTCDate() + 1).padStart(2, '0'),
            PROD_REQUEST_NO: next_prod_request_no,
            CODE_03: '01',
            CODE_55: loaisx_code,
            CODE_50: loaixh_code,
            G_CODE: g_code,
            RIV_NO: g_code.substring(7, 8),
            PROD_REQUEST_QTY: request_qty,
            CUST_CD: cust_cd,
            EMPL_NO: user_id.EMPL_NO,
            REMARK: remark,
            DELIVERY_DATE: delivery_date,
          };
          console.log(ycsx_data);
          generalQuery('insert_new_ycsx', ycsx_data)
            .then(response => {
              console.log(response.data.tk_status);
              //setEmplList(response.data.data);
              if (response.data.tk_status == 'OK') {                
                SweetAlert.showAlertWithOptions(
                  {
                    title: 'Thông báo',
                    subTitle: 'Thêm yêu cầu sản xuất mới thành công',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true,
                  },
                  callback => console.log('callback'),
                );
              } else {                
                SweetAlert.showAlertWithOptions(
                  {
                    title: 'Thông báo',
                    subTitle: 'Thêm YCSX mới thất bại ! ' + response.data.message,
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'error',
                    cancellable: true,
                  },
                  callback => console.log('callback'),
                );
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    // getEmplList();
    getuserid();
    getlistcode_customer();
  }, []);

  const loaisanxuat = [
    {
      id: '01',
      name: 'Thông thường',
    },
    {
      id: '02',
      name: 'SDI',
    },
    {
      id: '03',
      name: 'ETC',
    },
    {
      id: '04',
      name: 'Sample',
    },
  ];

  const loaixuathang = [
    {
      id: '01',
      name: 'GC',
    },
    {
      id: '02',
      name: 'SK',
    },
    {
      id: '03',
      name: 'KD',
    },
    {
      id: '04',
      name: 'VN',
    },
    {
      id: '05',
      name: 'SAMPLE',
    },
    {
      id: '06',
      name: 'Vai bac 4',
    },
    {
      id: '07',
      name: 'ETC',
    },
  ];

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#5ECFE3'}}>
      <SafeAreaView style={{flex: 1}}>        
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <View style={{width: '50%'}}>
              <Pressable
                onPress={() => {
                  setbuttonOption(1);
                }}
                style={styles.optionButtonStyle}>
                <Text style={styles.optionButtonText}>Chọn khách</Text>
              </Pressable>

              <Text style={styles.labeltext}>Khách hàng</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setprod_type(text);
                }}
                value={cust_name}
                placeholder="Tên khách hàng"
                placeholderTextColor={'grey'}></TextInput>

              <Pressable
                onPress={() => {
                  setbuttonOption(3);
                }}
                style={styles.optionButtonStyle}>
                <Text style={styles.optionButtonText}>Loại SX</Text>
              </Pressable>

              <Text style={styles.labeltext}>Loại sản xuất</Text>
              <TextInput
                value={loaisx}
                style={styles.input_text}
                placeholder="Loại sản xuất"
                placeholderTextColor={'grey'}></TextInput>

              <Text style={styles.labeltext}>Ngày cần giao</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={() => {
                  console.log('a');
                }}
                onFocus={() => {
                  showDatepicker(1);
                }}
                value={delivery_date.toString()}
                placeholder="Ngày cần giao"
                placeholderTextColor={'grey'}></TextInput>
              <Text style={styles.labeltext}>Ghi chú</Text>
              <TextInput
                style={styles.input_text}
                onChangeText={text => {
                  setremark(text);
                }}
                value={remark.toString()}
                placeholder="Ghi chú"
                placeholderTextColor={'grey'}></TextInput>
            </View>
            <View style={{width: '50%'}}>
              <Pressable
                onPress={() => {
                  setbuttonOption(2);
                }}
                style={styles.optionButtonStyle}>
                <Text style={styles.optionButtonText}>Chọn Code</Text>
              </Pressable>

              <Text style={styles.labeltext}>Code CMS</Text>
              <TextInput
                value={g_code}
                style={styles.input_text}
                onChangeText={text => {
                  setG_CODE(text);
                }}
                placeholder="Code ERP CMS"
                placeholderTextColor={'grey'}></TextInput>
              <Pressable
                onPress={() => {
                  setbuttonOption(4);
                }}
                style={styles.optionButtonStyle}>
                <Text style={styles.optionButtonText}>Loại XH</Text>
              </Pressable>
              <Text style={styles.labeltext}>Loại xuất hàng</Text>
              <TextInput
                value={loaixh.toString()}
                style={styles.input_text}
                placeholder="Loại xuất hàng"
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
              <Text style={styles.labeltext}>Số lượng YCSX</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input_text}
                onChangeText={text => {
                  setrequest_qty(text);
                }}
                placeholder="Số lượng YCSX"
                placeholderTextColor={'grey'}></TextInput>
            </View>
          </View>
        </ScrollView>
        <View style={{flex:10, alignItems:'center', marginTop: 5}}>
          <Button
            onPress={() => {
              prod_request_no_generate();
            }}
            title="Thêm YCSX mới"
            color={'#49C016'}
          />
        </View>


        {buttonOption != 0 ? (
          <SearchableDropdown
            onTextChange={text => console.log(text)}
            //On text change listner on the searchable input
            onItemSelect={item => {
              if (buttonOption == 1) {
                setCust_Name(item.name);
                setcust_cd(item.id);
              } else if (buttonOption == 2) {
                setG_NAME(item.name);
                setG_CODE(item.id);
              } else if (buttonOption == 3) {
                setloaisx(item.name);
                setloaisx_code(item.id);
              } else {
                setloaixh(item.name);
                setloaixh_code(item.id);
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
            items={
              buttonOption == 1
                ? listcustomer
                : buttonOption == 2
                ? listcode
                : buttonOption == 3
                ? loaisanxuat
                : loaixuathang
            }
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
export default NewYCSXForm;
