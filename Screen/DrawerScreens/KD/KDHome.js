import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#4EC11D',
    padding: 15,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 25,

    color: 'blue',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

const DATA = [
  {
    title: 'Quản lý PO',
    data: ['Thêm PO', 'Tra cứu PO'],
  },
  {
    title: 'Quản lý Invoice',
    data: ['Thêm invoice', 'Tra cứu invoice'],
  },
  {
    title: 'Quản lý yêu cầu sản xuất',
    data: ['Thêm YCSX', 'Tra cứu YCSX'],
  },
  {
    title: 'Kế hoạch giao hàng',
    data: ['Thêm kế hoạch', 'Tra cứu kế hoạch'],
  },
  {
    title: 'FCST',
    data: ['Tra cứu FCST'],
  },
];
export default function KDHome({navigation}) {
  const Item = ({title}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          if (title == 'Thêm PO') {
            navigation.navigate('NewPOForm', {
              options: title,
            });
          }
          else if (title == 'Thêm invoice') {
            Alert.alert(
              'Tại mục tra cứu PO, tìm kiếm PO muốn thêm invoice, nhấn giữ vào PO đó để thêm invoice',
            );
            navigation.navigate('DeliverySearchForm', {
              options: 'Tra cứu PO',
            });
          }
          else if (title == 'Thêm YCSX') {
            navigation.navigate('NewYCSXForm', {
              options: title,
            });
          } else if (title == 'Tra cứu YCSX') {
            Alert.alert(
              'Vào phòng kiểm tra, tra cứu IN-OUT (YCSX) để hiển thị thông tin về YCSX',
            );
          } else if (
            title != 'Thêm kế hoạch' &&
            title != 'Tra cứu kế hoạch' &&
            title != 'Tra cứu FCST'
          ) {
            navigation.push('DeliverySearchForm', {
              options: title,
            });
          } else {
            Alert.alert('Đang phát triển tính năng');
          }
        }}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}
