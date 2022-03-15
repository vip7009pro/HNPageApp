import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import SweetAlert from 'react-native-sweet-alert';

export default function DrawerMenu({navigation}) {
  const [items, setItems] = React.useState([
    {name: 'Thêm PO', code: '#1abc9c'},
    {name: 'Tra cứu PO', code: '#2ecc71'},
    {name: 'Thêm invoice', code: '#3498db'},
    {name: 'Tra cứu invoice', code: '#9b59b6'},
    {name: 'Thêm YCSX', code: '#34495e'},
    {name: 'Tra cứu YCSX', code: '#16a085'},
    {name: 'Thêm kế hoạch', code: '#27ae60'},
    {name: 'Tra cứu kế hoạch', code: '#2980b9'},
    {name: 'Tra cứu FCST', code: '#8e44ad'},
    {name: 'Nhập Kiểm (LOT)', code: '#2c3e50'},
    {name: 'Xuất Kiểm (LOT)', code: '#f1c40f'},
    {name: 'Nhập Xuất Kiểm (YCSX)', code: '#e67e22'},
    {name: 'Tra Nhật Ký Kiểm Tra', code: '#e74c3c'},
    {name: 'CLOUDS', code: '#ecf0f1'},
    {name: 'CONCRETE', code: '#95a5a6'},
    {name: 'ORANGE', code: '#f39c12'},
    {name: 'PUMPKIN', code: '#d35400'},
    {name: 'POMEGRANATE', code: '#c0392b'},
    {name: 'SILVER', code: '#bdc3c7'},
    {name: 'ASBESTOS', code: '#7f8c8d'},
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
      alignItems:'center',
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
      alignContent:'center'
      
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
        },
        {
          title: 'Quản lý Sản Xuất',
          data: items.slice(13, 20),
        },
      ]}
      style={styles.gridView}
      renderItem={({ item, section, index }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
    />   
  
  );
}
