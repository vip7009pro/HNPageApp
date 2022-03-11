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
    backgroundColor: '#6AA8F9',
    padding: 20,
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
    color: '#C26AF9',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

const DATA = [
  {
    title: 'Nhập xuất kiểm',
    data: ['Nhập Kiểm (LOT)', 'Xuất Kiểm (LOT)', 'Nhập Xuất Kiểm (YCSX)'],
  },
  {
    title: 'Data nhật ký kiểm tra',
    data: ['Nhập Nhật Ký Kiểm Tra', 'Tra Nhật Ký Kiểm Tra'],
  },
];
export default function InspectionHome({navigation}) {
  const Item = ({title}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
         /*  switch (title) {
            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;

            case '':
              navigation.push('InOutSearchForm', {
                options: title,
              });
              break;
          } */

          navigation.push('InOutSearchForm', {
            options: title,
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
