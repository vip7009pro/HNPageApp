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
  flatlist_format:{
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
  },
  flatlist_item_format:{
    flexDirection: 'column',
    margin: 8,
    backgroundColor: 'white',
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
  }
});

const Item = ({CNDB_ENCODE}) => {
  <View style={styles.item}>
    <Text style={styles.title}>{CNDB_ENCODE}</Text>
  </View>;
};

const TableScreen = ({route, navigation}) => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const receiveParams = route.params;


  const onRefresh = useCallback(() => {
    getEmplList(receiveParams);
  }, []);

  const getEmplList = searchData => {    
    setIndicator(true);
    setRefreshing(true);
    generalQuery('get_invoice', searchData)
      .then(response => {       
        setEmplList(response.data.data);
        setIndicator(false);
        setRefreshing(false);       
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {   
     getEmplList(receiveParams);
  }, []);

  const ItemRenderer = ({item, index}) => (
    <View
      style={styles.flatlist_item_format}>
      <Text
        style={{color: '#142CF0', fontSize: 15, paddingRight: 20}}>
        <Text style={{fontWeight: 'bold'}}>
          {index + 1}.
          {'\n'}
        </Text>
        <Text style={{fontWeight: 'bold'}}>{item.G_NAME}</Text>        
      </Text>
      
      <Text
        style={{color: 'green', fontSize: 15, paddingRight: 20}}>
        <Text style={{fontWeight: 'bold'}}>DELIVERY_DATE:</Text>
        {item.DELIVERY_DATE.slice(0, 10)}
      </Text>

      <Text
        style={{color: '#EF29F2', fontSize: 15, paddingRight: 20}}>
        <Text style={{fontWeight: 'bold'}}>DELIVERY_QTY: {item.DELIVERY_QTY}</Text>
        
      </Text>
    </View>
  )


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
              color: 'black',
            }}>
            Kết quả
          </Text>

          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.flatlist_format}
            data={emplList}
            renderItem={ItemRenderer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TableScreen;
