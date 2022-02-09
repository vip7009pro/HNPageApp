// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useCallback, useEffect, useState } from 'react';
import {RefreshControl, ActivityIndicator, View, Text, SafeAreaView, Button, Alert, ScrollView, FlatList, StyleSheet, StatusBar} from 'react-native';
import { ListItem } from 'react-native-elements';
import { generalQuery } from '../../Api/Api';

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
  </View>
};


const HomeScreen = () => {
  const [emplList,setEmplList]=useState('');
  const [indicator, setIndicator]= useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
   getEmplList();
   
  }, []);


  const getEmplList = () => {
    let insertData = {};
    setIndicator(true);
    setRefreshing(true);
    generalQuery('danhsachqc',insertData)
    .then(response => {
      //console.log(response.data.data);
      setEmplList(response.data.data);
      setIndicator(false);
      setRefreshing(false)   
     /*  Alert.alert(
        "Thông báo",
        "Tải data thành công",
        [          
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      ); */
    })
    .catch(error=>{
      console.log(error);
    })
  }
  useEffect(()=>{
   // getEmplList();

  },[]);

  const renderItem =({item}) => (
    <Item CNDB_ENCODE={item.CNDB_ENCODE}/>
  );


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
              marginBottom: 0,
              color: '#ff00ff',
            }}>
            Danh sách nhân viên QC
          </Text>
          <Text>{'\n'}</Text>

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
                  flexDirection: 'row',
                  margin: 10,
                  backgroundColor: 'lightgreen',
                  padding: 30,
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
                  style={{color: '#042CF5', fontSize: 10, paddingRight: 20}}>
                  {item.G_CODE}-{item.DELIVERY_DATE}-{item.DELIVERY_QTY}
                </Text>
                <View style={{flexDirection:'column', marginLeft:20, width: 80}}>
                  <Button color="blue" title="Làm" />
                  <Text>{}</Text>
                  <Button color="red" title="Nghỉ" />
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
