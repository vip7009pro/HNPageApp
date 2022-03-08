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
  flatlist_format: {
    backgroundColor: 'white',
    width: '100%',
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
  flatlist_item_format: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  headerText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 25,
    marginRight: 55,
  },
});

const Item = ({CNDB_ENCODE}) => {
  <View style={styles.item}>
    <Text style={styles.title}>{CNDB_ENCODE}</Text>
  </View>;
};

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const TableScreen = ({route, navigation}) => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sumqty, setsumqty] = useState(0);
  const [sumamount, setsumamount] = useState(0);
  const receiveParams = route.params;

  const onRefresh = useCallback(() => {
    getEmplList(receiveParams);
  }, []);

  const getEmplList = searchData => {
    setIndicator(true);
    setRefreshing(true);
    generalQuery('get_invoice', searchData)
      .then(response => {
        if (response.data.status == 'NG') {
          setRefreshing(false);
          setIndicator(false);
          Alert.alert('Không có data nào !');
        } else {
          Alert.alert('Đã load ' + response.data.data.length + ' dòng dữ liệu');
          let sumAmount = 0.0;
          let sumQty = 0;
          for (let k = 0; k < response.data.data.length; k++) {
            sumQty += response.data.data[k].DELIVERY_QTY;
            sumAmount += response.data.data[k].DELIVERED_AMOUNT;
          }
          console.log('Qty total = ' + sumQty);
          console.log('Amount total = ' + sumAmount);
          setsumqty(sumQty);
          setsumamount(sumAmount);

          setEmplList(response.data.data);
          setIndicator(false);
          setRefreshing(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getEmplList(receiveParams);
  }, []);

  const sumaryRenderer = () => (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
        Total Qty: {numberWithCommas(sumqty)} EA
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
        Total Amount: {currencyFormat(sumamount)}
      </Text>
    </View>
  );
  const headerRenderer = () => (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Khách hàng
      </Text>
      <Text style={{color: 'blue', width: 200, fontWeight: 'bold'}}>
        Code hàng
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Ngày giao
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Số lượng giao
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Đơn giá
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Thành tiền
      </Text>
    </View>
  );

  const ItemRenderer = ({item, index}) => (
    <View
      style={[
        styles.flatlist_item_format,
        {
          borderLeftWidth: 1,
          borderLeftColor: 'black',
          borderRightWidth: 1,
          borderRightColor: 'black',
        },
      ]}>
      <Text style={{fontWeight: 'bold', color: 'red'}}>{index + 1}.</Text>
      <Text style={{fontWeight: 'bold', width: 80, color: 'green'}}>
        {item.CUST_NAME_KD}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#142CF0',
          fontSize: 15,
          width: 200,
        }}>
        {item.G_NAME}
      </Text>
      <Text style={{fontWeight: 'bold', width: 100, color: 'grey'}}>
        {item.DELIVERY_DATE.slice(0, 10)}
      </Text>

      <Text style={{color: '#8C12FE', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>
          {numberWithCommas(item.DELIVERY_QTY)}
        </Text>
      </Text>
      <Text style={{color: '#EF29F2', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>{item.PROD_PRICE}</Text>
      </Text>
      <Text style={{color: '#339E05', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>
          {currencyFormat(item.DELIVERED_AMOUNT)}
        </Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {indicator && <ActivityIndicator size="large" color="#00ff00" />}
      {sumaryRenderer()}
      <ScrollView horizontal={true}>
        <View style={{flex: 1}}>
          {headerRenderer()}
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.flatlist_format}
            data={emplList}
            renderItem={ItemRenderer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TableScreen;
