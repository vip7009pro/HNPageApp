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
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  Pressable,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {generalQuery} from '../../Api/Api';
import LinearGradient from 'react-native-linear-gradient';
import SweetAlert from 'react-native-sweet-alert';
import XLSX from 'xlsx';
import moment from 'moment';
var RNFS = require('react-native-fs');
import FileViewer from 'react-native-file-viewer';

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
    marginRight: 10,
  },
});

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
  const [sumdeliqty, setsumdeliqty] = useState(0);
  const [sumdeliamount, setsumdeliamount] = useState(0);
  const [sumbalanceqty, setsumbalanceqty] = useState(0);
  const [sumbalanceamount, setsumbalanceamount] = useState(0);
  const [receiveParams, setreceiveParams] = useState(route.params);

  const handleDeepLinkPress = (url) => {
    Linking.openURL(url).catch((e) => {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Thông báo',
          subTitle: 'Có lỗi: '+e.toString() ,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'error',
          cancellable: true,
        },
        callback => console.log('callback'),
      );
    });
  };
  const exportDataToExcel = data => {
    // Created Sample data
   
    //console.log(data);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    const pathexcel = RNFS.ExternalStorageDirectoryPath + '/Download/' + moment(new Date()).format('YYYY-MM-DD hms')+'.xlsx';
    // Write generated excel to Storage
    RNFS.writeFile(pathexcel
      ,
      wbout,
      'ascii',
    )
      .then(r => {
        console.log('Success');
        SweetAlert.showAlertWithOptions(
          {
            title: 'Thông báo',
            subTitle: 'Lưu file excel thành công: ' + pathexcel,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            cancelButtonTitle:'Cancel',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'success',
            cancellable: true,
          },
          callback => {
            /* handleDeepLinkPress('file://' + pathexcel); */
            //handleDeepLinkPress('http://14.160.33.94:3030');              
              FileViewer.open(pathexcel, {showOpenWithDialog: true}) // absolute-path-to-my-local-file.
                .then(() => {
                  // success
                  
                })
                .catch(error => {
                  SweetAlert.showAlertWithOptions(
                    {
                      title: 'Thông báo',
                      subTitle: 'Thất bại: ' + error.toString(),
                      confirmButtonTitle: 'OK',
                      confirmButtonColor: '#000',
                      cancelButtonTitle:'Cancel',
                      otherButtonTitle: 'Cancel',
                      otherButtonColor: '#dedede',
                      style: 'success',
                      cancellable: true,
                    });
                });
          },
        );
      })
      .catch(e => {
        console.log('Error', e);
        SweetAlert.showAlertWithOptions(
          {
            title: 'Thông báo',
            subTitle: 'Có lỗi: '+e.toString() ,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'error',
            cancellable: true,
          },
          callback => console.log('callback'),
        );
      });
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage write permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const granted2 = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage read permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED && granted2 === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel(emplList);
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportDataToExcel(emplList);
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

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
              subTitle:
                'Đã load ' + response.data.data.length + ' dòng dữ liệu',
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
          let sumbalanceAmount = 0.0;

          if (receiveParams.OPTIONS == 'Tra cứu PO') {
            console.log('tinh po');
            for (let k = 0; k < response.data.data.length; k++) {
              sumQty += response.data.data[k].PO_QTY;
              sumAmount += response.data.data[k].PO_AMOUNT;
              sumdeliQty += response.data.data[k].DELIVERY_QTY;
              sumdeliAmount += response.data.data[k].DELIVERED_AMOUNT;
              sumbalanceQty += response.data.data[k].PO_BALANCE_QTY;
              sumbalanceAmount += response.data.data[k].PO_BALANCE_AMOUNT;
            }
          } else if (receiveParams.OPTIONS == 'Tra cứu invoice') {
            console.log('tinh invoice');
            for (let k = 0; k < response.data.data.length; k++) {
              sumQty += response.data.data[k].DELIVERY_QTY;
              sumAmount += response.data.data[k].DELIVERED_AMOUNT;
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

  const sumaryRenderer_invoice = () => (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
        Total Qty: {numberWithCommas(sumqty)} EA
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
        Total Amount: {currencyFormat(sumamount)}
      </Text>
      {/* <Button
        onPress={() => {
          navigation.replace('DeliverySearchForm');
        }}
        title="Back"
        color={'green'}
      /> */}
    </View>
  );
  const headerRenderer_invoice = () => (
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
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>Số PO</Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Số lượng giao
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Đơn giá
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Thành tiền
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Phân loại
      </Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>PIC</Text>
    </View>
  );

  const ItemRenderer_invoice = ({item, index}) => (
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
      <Text style={{color: '#039E05', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.PO_NO}</Text>
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
      <Text style={{color: '#039E05', fontSize: 15, width: 100}}>
        <Text style={{fontWeight: 'bold'}}>{item.PROD_TYPE}</Text>
      </Text>
      <Text style={{color: '#039E05', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.EMPL_NAME}</Text>
      </Text>
    </View>
  );

  const sumaryRenderer_po = () => (
    <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
      <View style={styles.summaryBox}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'blue'}}>
          {numberWithCommas(sumqty)} EA
        </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'blue'}}>
          {currencyFormat(sumamount)}
        </Text>
      </View>
      <View style={styles.summaryBox}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'green'}}>
          {numberWithCommas(sumdeliqty)} EA
        </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'green'}}>
          {currencyFormat(sumdeliamount)}
        </Text>
      </View>
      <View style={styles.summaryBox}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'red'}}>
          {numberWithCommas(sumbalanceqty)} EA
        </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'red'}}>
          {currencyFormat(sumbalanceamount)}
        </Text>
      </View>
    </View>
  );
  const headerRenderer_po = () => (
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
        PO Date
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        RD Date
      </Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>Số PO</Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Đơn giá
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        PO QTY
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        DELIVERY QTY
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        BALANCE QTY
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        PO AMOUNT
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        DELIVERY AMOUNT
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        BALANCE AMOUNT
      </Text>
      <Text style={{color: 'blue', width: 100, fontWeight: 'bold'}}>
        Phân loại
      </Text>
      <Text style={{color: 'blue', width: 150, fontWeight: 'bold'}}>PIC</Text>
    </View>
  );

  const ItemRenderer_po = ({item, index}) => (
    <Pressable
      onLongPress={() => {
        navigation.navigate('NewInvoiceForm', item);
      }}
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
        {item.PO_DATE.slice(0, 10)}
      </Text>
      <Text style={{fontWeight: 'bold', width: 100, color: 'grey'}}>
        {item.RD_DATE.slice(0, 10)}
      </Text>
      <Text
        style={{
          color: '#039E05',
          fontSize: 15,
          width: 150,
          fontWeight: 'bold',
        }}>
        {item.PO_NO}
      </Text>
      <Text
        style={{
          color: '#EF29F2',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {item.PROD_PRICE}
      </Text>
      <Text
        style={{
          color: '#8C12FE',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {numberWithCommas(item.PO_QTY)}
      </Text>
      <Text
        style={{
          color: '#8C12FE',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {numberWithCommas(item.DELIVERY_QTY)}
      </Text>
      <Text
        style={{
          color: '#8C12FE',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {numberWithCommas(item.PO_BALANCE_QTY)}
      </Text>
      <Text
        style={{
          color: '#339E05',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {currencyFormat(item.PO_AMOUNT)}
      </Text>
      <Text
        style={{
          color: '#339E05',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {currencyFormat(item.DELIVERED_AMOUNT)}
      </Text>
      <Text
        style={{
          color: '#339E05',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {currencyFormat(item.PO_BALANCE_AMOUNT)}
      </Text>
      <Text
        style={{
          color: '#F36425',
          fontSize: 15,
          width: 100,
          fontWeight: 'bold',
        }}>
        {item.PROD_TYPE}
      </Text>
      <Text style={{color: '#1FA5C6', fontSize: 15, width: 150}}>
        <Text style={{fontWeight: 'bold'}}>{item.EMPL_NAME}</Text>
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button
        title="Save Excel"
        onPress={() => {
          handleClick();
        }}
        color="green"></Button>
      {indicator && <ActivityIndicator size="large" color="#00ff00" />}
      {receiveParams.OPTIONS == 'Tra cứu PO'
        ? sumaryRenderer_po()
        : receiveParams.OPTIONS == 'Tra cứu invoice'
        ? sumaryRenderer_invoice()
        : receiveParams.OPTIONS == 'Tra cứu kế hoạch'
        ? sumaryRenderer_invoice()
        : receiveParams.OPTIONS == 'Tra cứu FCST'
        ? sumaryRenderer_invoice()
        : receiveParams.OPTIONS == 'Tra cứu YCSX'
        ? sumaryRenderer_invoice()
        : sumaryRenderer_invoice()}
      <ScrollView horizontal={true}>
        <View style={{flex: 1}}>
          {receiveParams.OPTIONS == 'Tra cứu PO'
            ? headerRenderer_po()
            : receiveParams.OPTIONS == 'Tra cứu invoice'
            ? headerRenderer_invoice()
            : receiveParams.OPTIONS == 'Tra cứu kế hoạch'
            ? headerRenderer_invoice()
            : receiveParams.OPTIONS == 'Tra cứu FCST'
            ? headerRenderer_invoice()
            : receiveParams.OPTIONS == 'Tra cứu YCSX'
            ? headerRenderer_invoice()
            : headerRenderer_invoice()}
          <FlatList
            /*   refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } */
            style={styles.flatlist_format}
            data={emplList}
            renderItem={
              receiveParams.OPTIONS == 'Tra cứu PO'
                ? ItemRenderer_po
                : receiveParams.OPTIONS == 'Tra cứu invoice'
                ? ItemRenderer_invoice
                : receiveParams.OPTIONS == 'Tra cứu kế hoạch'
                ? ItemRenderer_invoice
                : receiveParams.OPTIONS == 'Tra cứu FCST'
                ? ItemRenderer_invoice
                : receiveParams.OPTIONS == 'Tra cứu YCSX'
                ? ItemRenderer_invoice
                : ItemRenderer_invoice
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TableScreen;
