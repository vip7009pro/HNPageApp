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
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
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
    title: 'Kế hoạch giao hàng',
    data: ['Thêm kế hoạch', 'Tra cứu kế hoạch'],
  },
  {
    title: 'FCST',
    data: ['Tra cứu FCST'],
  },
  {
    title: 'Quản lý yêu cầu sản xuất',
    data: ['Thêm YCSX', 'Tra cứu YCSX'],
  },
];
export default function KDHome({navigation}) {
  const Item = ({title}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
            switch (title) {
              case '':
                navigation.push('DeliverySearchForm',{
                    options:title
                });  
                break;

              case '':
                navigation.push('DeliverySearchForm',{
                    options:title
                });  
                break;

              case '':
                   navigation.push('DeliverySearchForm',{
                options:title
            });  
                break;

              case '':
                   navigation.push('DeliverySearchForm',{
                options:title
            });  
                break;

              case '':
                   navigation.push('DeliverySearchForm',{
                options:title
            });  
                break;

              case '':
                   navigation.push('DeliverySearchForm',{
                options:title
            });  
                break;

              case '':
                   navigation.push('DeliverySearchForm',{
                options:title
            });  
                break;

              case '':
                   navigation.push('DeliverySearchForm',{
                options:title
            });  
                break;
            }

            navigation.push('DeliverySearchForm',{
                options:title
            });         
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
