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
import {generalQuery} from '../../Api/Api';
import LinearGradient from 'react-native-linear-gradient';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

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
});

const Item = ({CNDB_ENCODE}) => {
  <View style={styles.item}>
    <Text style={styles.title}>{CNDB_ENCODE}</Text>
  </View>;
};

const HomeScreen = () => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

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
    generalQuery('danhsachqc', insertData)
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
            Danh sách nhân viên QC{'\n'}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              color: '#ff00ff',
            }}>
            Tìm kiếm:
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
            renderItem={({item}) => (
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
                  <Text style={{fontWeight: 'bold'}}>Họ và tên:</Text>{' '}
                  {item.MIDLAST_NAME} {item.FIRST_NAME}
                </Text>

                <Text
                  style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
                  <Text style={{fontWeight: 'bold'}}>Địa chỉ:</Text>{' '}
                  {item.ADD_VILLAGE}-{item.ADD_COMMUNE}-{item.ADD_DISTRICT}-
                  {item.ADD_PROVINCE}
                </Text>

                <Text
                  style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
                  <Text style={{fontWeight: 'bold'}}>Birthday:</Text>
                  {item.DOB.slice(0, 10)}
                </Text>

                <Text
                  style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
                  <Text style={{fontWeight: 'bold'}}>Phone:</Text>
                  {item.PHONE_NUMBER}
                </Text>

                <View style={{flexDirection: 'row', width: 80}}>
                  <Button
                    color="#16CC21"
                    title="Làm"
                    onPress={() => {
                      lamButton(item.FIRST_NAME);
                    }}
                  />
                  <Text> </Text>
                  <Button color="red" title="Nghỉ" />
                  <Text> </Text>
                  <Button color="grey" title="Reset" />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
