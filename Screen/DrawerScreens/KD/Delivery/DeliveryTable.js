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
} from 'react-native';
import {ListItem} from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';
import { generalQuery } from '../../../../Api/Api';
import { Table, TableWrapper, Row } from 'react-native-table-component';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});

const Item = ({CNDB_ENCODE}) => {
  <View style={styles.item}>
    <Text style={styles.title}>{CNDB_ENCODE}</Text>
  </View>;
};

const DeliveryTable = () => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [tableHead, settableHead]=useState(['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9']);
  const [widthArr,setwidthArr]= useState([40, 60, 80, 100, 120, 140, 160, 180, 200]);

  const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }


  const lamButton = submitData => {
    Alert.alert(submitData);
  };
  const onRefresh = useCallback(() => {
    getEmplList(searchText);
  }, []);

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

  const renderItem = ({item}) => <Item CNDB_ENCODE={item.CNDB_ENCODE} />;

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView horizontal={true}>     
      {indicator && <ActivityIndicator size="large" color="#00ff00" />}
      <View style={{flex: 1, padding: 2}}>
        <View
          style={{
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              color: '#ff00ff',
            }}>
            Tra data kiểm{'\n'}
          </Text>         
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              backgroundColor: '#88D68D',
            }}
            onChangeText={newText => {
              setSearchText(newText);
              getEmplList(newText);
            }}
            value={searchText}
            placeholder="Nhập tên nhân viên để tìm kiếm"></TextInput>
            <Table >
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}              
            />
          </Table>

          <Table>

          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '85%',
              borderRadius: 10,
              shadowColor: '#00FF00',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.43,
              shadowRadius: 9.51,

              elevation: 15,
            }}
            data={emplList}
            renderItem={({item, index}) => (

           /*    <Table>              
                <Row   
                  key={index}              
                  data={['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9']}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: '#1D9BE4'},
                  ]}
                 
                />            
            </Table> */

              
              <View
               
                style={{
                  flexDirection: 'column',
                  margin: 8,
                  backgroundColor: '#51D1F1',
                  padding: 10,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,
                  elevation: 15,
                }}>
                <Text
                  style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
                  <Text style={{fontWeight: 'bold'}}>G_NAME:</Text>{' '}
                  {item.G_NAME}
                </Text>              

                <Text
                  style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
                  <Text style={{fontWeight: 'bold'}}>DELIVERY_DATE:</Text>
                  {item.DELIVERY_DATE.slice(0,10)}
                </Text>

                <Text
                  style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
                  <Text style={{fontWeight: 'bold'}}>DELIVERY_QTY:</Text>
                  <Text style={{color:'green'}}>{item.DELIVERY_QTY}</Text>
                </Text>

               
              </View>
            )}
          />
          </Table>
          
        </View>
      </View>


    {/* <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderColor: '#C1C0B9'}}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: '#F7F6E7'},
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View> */}

    </ScrollView>
    </SafeAreaView>
  );
};
export default DeliveryTable;
