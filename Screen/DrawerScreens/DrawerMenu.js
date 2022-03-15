import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import SweetAlert from 'react-native-sweet-alert';

export default function DrawerMenu({navigation}) {
  const [items, setItems] = React.useState([
    {name: 'Thêm PO', option: 'Thêm PO', code: '#1abc9c', icon: 'add-circle', stack:'NewPOForm'},
    {name: 'Thêm invoice',option: 'Tra cứu PO', code: '#2ecc71', icon: 'add-circle', stack:'DeliverySearchForm'},
    {name: 'Thêm YCSX', option: 'Thêm YCSX', code: '#3498db', icon: 'add-circle', stack:'NewYCSXForm'},
    {name: 'Tra cứu invoice', option: 'Tra cứu invoice',code: '#9b59b6', icon: 'search', stack:'DeliverySearchForm'},
    {name: 'Tra cứu PO', option: 'Tra cứu PO',code: '#34495e', icon: 'search', stack:'DeliverySearchForm'},
    {name: 'Tra cứu YCSX', option: 'Tra cứu YCSX',code: '#16a085', icon: 'search', stack:'DeliverySearchForm'},
    {name: 'Thêm kế hoạch', option: 'Thêm kế hoạch',code: '#27ae60', icon: 'add-circle', stack:'DeliverySearchForm'},
    {name: 'Tra cứu kế hoạch', option: 'Tra cứu kế hoạch',code: '#2980b9', icon: 'search', stack:'DeliverySearchForm'},
    {name: 'Tra cứu FCST', option: 'Tra cứu FCST',code: '#8e44ad', icon: 'search', stack:'DeliverySearchForm'},
    {name: 'Nhập Kiểm (LOT)', option: 'Nhập Kiểm (LOT)',code: '#2c3e50', icon: 'home', stack:'InOutSearchForm'},
    {name: 'Xuất Kiểm (LOT)', option: 'Xuất Kiểm (LOT)',code: '#f1c40f', icon: 'home', stack:'InOutSearchForm'},
    {name: 'Nhập Xuất Kiểm (YCSX)', option: 'Nhập Xuất Kiểm (YCSX)',code: '#e67e22', icon: 'home', stack:'InOutSearchForm'},
    {name: 'Tra Nhật Ký Kiểm Tra', option: 'Tra Nhật Ký Kiểm Tra',code: '#e74c3c', icon: 'home', stack:'InOutSearchForm'},
    {name: 'CLOUDS', option: 'Thêm PO',code: '#ecf0f1', icon: 'home', stack:'NewPOForm'},
    {name: 'CONCRETE', option: 'Thêm PO',code: '#95a5a6', icon: 'home', stack:'NewPOForm'},
    {name: 'ORANGE', option: 'Thêm PO',code: '#f39c12', icon: 'home', stack:'NewPOForm'},
    {name: 'PUMPKIN', option: 'Thêm PO',code: '#d35400', icon: 'home', stack:'NewPOForm'},
    {name: 'POMEGRANATE', option: 'Thêm PO',code: '#c0392b', icon: 'home', stack:'NewPOForm'},
    {name: 'SILVER', option: 'Thêm PO',code: '#bdc3c7', icon: 'home', stack:'NewPOForm'},
    {name: 'ASBESTOS', option: 'Thêm PO',code: '#7f8c8d', icon: 'home', stack:'NewPOForm'},
  ]);

  const styles2 = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
  });

  const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    sectionHeader: {
      flex: 1,
      fontSize: 20,
      fontWeight: '600',
      alignItems: 'center',
      color: 'blue',
      padding: 10,
      alignContent: 'center',
    },
  });

  return (
    <SectionGrid
      itemDimension={120}
      // staticDimension={300}
      // fixed
      // spacing={20}
      sections={[
        {
          title: 'Phòng Kinh Doanh',
          data: items.slice(0, 9),
        },
        {
          title: 'Phòng Kiểm Tra',
          data: items.slice(9, 13),
        }/* ,
        {
          title: 'Quản lý Sản Xuất',
          data: items.slice(13, 20),
        }, */
      ]}
      style={styles.gridView}
      renderItem={({item, section, index}) => (
        <Pressable style={[styles.itemContainer, {backgroundColor: item.code}]}
        onPress={()=>{
           navigation.navigate(item.stack,{
            options: item.option,
          })
        }}        
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Icon
            name={`md-${item.icon}`}
            type="ionicon"
            color="white"
            rotate={true}
          />
        </Pressable>
      )}
      renderSectionHeader={({section}) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
    />
  );
}
