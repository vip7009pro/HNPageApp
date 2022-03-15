// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import moment from 'moment';
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
import SweetAlert from 'react-native-sweet-alert';
import { generalQuery } from '../../../../Api/Api';

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
  summaryBox: {
    marginLeft: 10,
    marginRight: 10
  }
});

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const InOutTable = ({route, navigation}) => {
  const [emplList, setEmplList] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sumqty, setsumqty] = useState(0);
  const [sumamount, setsumamount] = useState(0);
  const [sumdeliqty, setsumdeliqty] = useState(0);
  const [sumdeliamount, setsumdeliamount] = useState(0);
  const [sumbalanceqty, setsumbalanceqty] = useState(0);
  const [sumbalanceamount, setsumbalanceamount] = useState(0);
  const [receiveParams,setreceiveParams] = useState(route.params);
    
  const onRefresh = useCallback(() => {
    getEmplList(receiveParams);
  }, []);

  const getEmplList = searchData => {
    setIndicator(true);
    setRefreshing(true);
    generalQuery('get_inspection', searchData)
      .then(response => {
        if (response.data.status == 'NG') {
          setRefreshing(false);
          setIndicator(false);          
          SweetAlert.showAlertWithOptions(
            {
              title: 'Thông báo',
              subTitle: 'Không có data',
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
          SweetAlert.showAlertWithOptions(
            {
              title: 'Thông báo',
              subTitle: 'Đã load ' + response.data.data.length + ' dòng dữ liệu',
              confirmButtonTitle: 'OK',
              confirmButtonColor: '#000',
              otherButtonTitle: 'Cancel',
              otherButtonColor: '#dedede',
              style: 'success',
              cancellable: true,
            },
            callback => console.log('callback'),
          );    
          let sumAmount = 0.0;
          let sumQty = 0;
          let sumdeliQty = 0;
          let sumdeliAmount = 0.0;
          let sumbalanceQty = 0;
          let sumbalanceAmount =0.0;
          
          if (receiveParams.OPTIONS == 'Nhập Xuất Kiểm (YCSX)') {            
            for (let k = 0; k < response.data.data.length; k++) {
              sumQty += response.data.data[k].LOT_TOTAL_INPUT_QTY_EA;             
              sumdeliQty += response.data.data[k].LOT_TOTAL_OUTPUT_QTY_EA;             
            }
          } else if (receiveParams.OPTIONS == 'Nhập Kiểm (LOT)') {
           
            for (let k = 0; k < response.data.data.length; k++) {
              sumQty += response.data.data[k].INPUT_QTY_EA;
             // sumAmount += response.data.data[k].DELIVERED_AMOUNT;
            }
          }               
          else if (receiveParams.OPTIONS == 'Xuất Kiểm (LOT)') {
            
            for (let k = 0; k < response.data.data.length; k++) {
              sumQty += response.data.data[k].OUTPUT_QTY_EA;
              //sumAmount += response.data.data[k].DELIVERED_AMOUNT;
            }
          }               
          
          console.log('Qty total = ' + sumQty);
          console.log('Amount total = ' + sumAmount);
          console.log('Qty deli total = ' + sumdeliQty);
          console.log('Amount deli total = ' + sumdeliAmount);
          console.log('Qty balance total = ' + sumbalanceQty);
          console.log('Amount balance total = ' + sumbalanceAmount);

          setsumqty(sumQty);
          setsumamount(sumAmount);
          setsumdeliqty(sumdeliQty);
          setsumdeliamount(sumdeliAmount);
          setsumbalanceqty(sumbalanceQty);
          setsumbalanceamount(sumbalanceAmount);

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

  const sumaryRenderer_inspect_input = () => (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
        Total Input QTY: {numberWithCommas(sumqty)} EA
      </Text>      
    </View>
  );
  const headerRenderer_inspect_input = () => (
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
        Số YCSX
      </Text>
      <Text style={{color: 'blue', width: 200, fontWeight: 'bold'}}>
        Thời gian nhập kiểm
      </Text>     
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Số lượng nhập
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Nhà máy
      </Text>     
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Phân loại
      </Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>PIC</Text>
    </View>
  );
  const ItemRenderer_inspect_input = ({item, index}) => (
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
      <Text style={{fontWeight: 'bold', width: 100, color: 'green'}}>
        {item.PROD_REQUEST_NO}
      </Text>
      <Text style={{fontWeight: 'bold', width: 200, color: 'grey'}}>
        {item.INPUT_DATETIME.slice(0,10) +  ' ' + item.INPUT_DATETIME.slice(11,18)}       
      </Text>     
      <Text style={{color: '#8C12FE', fontSize: 15, width: 100, fontWeight: 'bold'}}>        
          {numberWithCommas(item.INPUT_QTY_EA)}       
      </Text>
      <Text style={{color: '#EF29F2', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>{item.REMARK}</Text>
      </Text>     
      <Text style={{color: '#3B2CEE', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>{item.PROD_TYPE}</Text>
      </Text>
      <Text style={{color: '#28B4ED', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.EMPL_NAME}</Text>
      </Text>
    </View>
  );



  const sumaryRenderer_inspect_output = () => (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
        Total Output QTY: {numberWithCommas(sumqty)} EA
      </Text>      
    </View>
  );
  const headerRenderer_inspect_output = () => (
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
        Số YCSX
      </Text>
      <Text style={{color: 'blue', width: 200, fontWeight: 'bold'}}>
        Thời gian xuất kiểm
      </Text>     
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Số lượng xuất
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Nhà máy
      </Text>     
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Phân loại
      </Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>PIC</Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>Ca làm việc</Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>Ngày làm việc</Text>
    </View>
  );
  const ItemRenderer_inspect_output = ({item, index}) => (
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
      <Text style={{fontWeight: 'bold', width: 100, color: 'green'}}>
        {item.PROD_REQUEST_NO}
      </Text>
      <Text style={{fontWeight: 'bold', width: 200, color: 'grey'}}>        
        {item.OUTPUT_DATETIME.slice(0,10) +  ' ' + item.OUTPUT_DATETIME.slice(11,18)}  
      </Text>     
      <Text style={{color: '#8C12FE', fontSize: 15, width: 100, fontWeight: 'bold'}}>        
          {numberWithCommas(item.OUTPUT_QTY_EA)}       
      </Text>
      <Text style={{color: '#EF29F2', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>{item.REMARK}</Text>
      </Text>     
      <Text style={{color: '#3B2CEE', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>{item.PROD_TYPE}</Text>
      </Text>
      <Text style={{color: '#28B4ED', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.EMPL_NAME}</Text>
      </Text>
      <Text style={{color: '#0CC156', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.CA_LAM_VIEC}</Text>
      </Text>
      <Text style={{color: '#F9A822', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{moment(item.NGAY_LAM_VIEC).format("YYYY-MM-DD")}</Text>
      </Text>
    </View>
  );


  const sumaryRenderer_inspect_inoutycsx = () => (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
        Total Input QTY: {numberWithCommas(sumqty)} EA
      </Text>      
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
        Total Output QTY: {numberWithCommas(sumdeliqty)} EA
      </Text>  
    </View>
  );
  const headerRenderer_inspect_inoutycsx = () => (
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
        Số YCSX
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Số lượng YC
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Tổng nhập
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Tổng xuất
      </Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>PIC</Text>
    </View>
  );
  const ItemRenderer_inspect_inoutycsx = ({item, index}) => (
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
      <Text style={{fontWeight: 'bold', width: 100, color: 'green'}}>
        {item.PROD_REQUEST_NO}
      </Text>
      <Text
        style={{
          color: '#8C12FE',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {numberWithCommas(item.PROD_REQUEST_QTY)}
      </Text>
      <Text
        style={{
          color: '#8C12FE',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {numberWithCommas(item.LOT_TOTAL_INPUT_QTY_EA)}
      </Text>
      <Text
        style={{
          color: '#8C12FE',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {numberWithCommas(item.LOT_TOTAL_OUTPUT_QTY_EA)}
      </Text>
      <Text style={{color: '#28B4ED', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.PIC_KD}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {indicator && <ActivityIndicator size="large" color="#00ff00" />}
      {receiveParams.OPTIONS=='Xuất Kiểm (LOT)'? sumaryRenderer_inspect_output() : receiveParams.OPTIONS=='Nhập Kiểm (LOT)'? sumaryRenderer_inspect_input(): receiveParams.OPTIONS=='Nhập Xuất Kiểm (YCSX)'? sumaryRenderer_inspect_inoutycsx(): receiveParams.OPTIONS=='Tra cứu FCST'? sumaryRenderer_inspect_input() :receiveParams.OPTIONS=='Tra cứu YCSX'?  sumaryRenderer_inspect_input() : sumaryRenderer_inspect_input()}
      <ScrollView horizontal={true}>
        <View style={{flex: 1}}>
          {receiveParams.OPTIONS=='Xuất Kiểm (LOT)'? headerRenderer_inspect_output() : receiveParams.OPTIONS=='Nhập Kiểm (LOT)'? headerRenderer_inspect_input(): receiveParams.OPTIONS=='Nhập Xuất Kiểm (YCSX)'? headerRenderer_inspect_inoutycsx(): receiveParams.OPTIONS=='Tra cứu FCST'? headerRenderer_inspect_input() :receiveParams.OPTIONS=='Tra cứu YCSX'?  headerRenderer_inspect_input() : headerRenderer_inspect_input()}
          <FlatList
          /*   refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } */
            style={styles.flatlist_format}
            data={emplList}
            renderItem={receiveParams.OPTIONS=='Xuất Kiểm (LOT)'? ItemRenderer_inspect_output : receiveParams.OPTIONS=='Nhập Kiểm (LOT)'? ItemRenderer_inspect_input: receiveParams.OPTIONS=='Nhập Xuất Kiểm (YCSX)'? ItemRenderer_inspect_inoutycsx: receiveParams.OPTIONS=='Tra cứu FCST'? ItemRenderer_inspect_input :receiveParams.OPTIONS=='Tra cứu YCSX'?  ItemRenderer_inspect_input : ItemRenderer_inspect_input}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default InOutTable;
