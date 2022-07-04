import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Pressable, SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';

export default function AccountTab({navigation}) {
  const [userid, setUserId] = useState('');
  const DOB = () => {
    if (userid.DOB != null) {
      return userid.DOB;
    } else {
      return '2021-12-16';
    }
  };
  const getuserid = () => {
    AsyncStorage.getItem('user_id')
      .then(value => {
        // userid = JSON.parse(JSON.parse(value).userInfo)[0];
        let result = JSON.parse(JSON.parse(value).userInfo)[0];
        setUserId(result);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getuserid();
  }, []);

  const DATA = [
    {
      title: 'Thông tin cá nhân',
      data: ['Họ và tên: '+ userid.MIDLAST_NAME + " " + userid.FIRST_NAME,
        'Mã nhân viên: '+ userid.EMPL_NO,
        'Mã nhân sự: '+ userid.CMS_ID,
        'Ngày tháng năm sinh: ' + DOB().slice(0, 10),
        'Quê quán: '+ userid.HOMETOWN,
        'Địa chỉ thường trú: '+ userid.ADD_VILLAGE + '-' + userid.ADD_COMMUNE + '-' +  userid.ADD_DISTRICT + '-' + userid.ADD_PROVINCE,
        'Bộ phận chính: ' + userid.MAINDEPTNAME,
        'Bộ phận phụ: '+ userid.SUBDEPTNAME,
        'Vị trí làm việc: '+ userid.WORK_POSITION_NAME,
        'Nhóm điểm danh: '+ userid.WORK_POSITION_NAME,
        'Chức vụ: '+ userid.JOB_NAME,
    ],
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
      <Pressable
      style={styles.logout}
      onPress={()=> {
        Alert.alert(
          'Logout',
          'Are you sure? You want to logout?',
          [
            {
              text: 'Cancel',
              onPress: () => {
                return null;
              },
            },
            {
              text: 'Confirm',
              onPress: () => {
                AsyncStorage.clear();
                navigation.replace('Auth');
              },
            },
          ],
          {cancelable: false},
        );      
        
      }
      }>
        <Text>Logout</Text>
             
      </Pressable>
    </SafeAreaView>   
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        alignItems:'center'
      },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#307ecc',
    paddingTop: 40,
    color: 'white',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    alignContent: 'space-around',
  },
  header: {
    fontSize: 25,
    color: '#06BF00',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 15,
    color: 'white',
  },
  item: {
    backgroundColor: '#6A88F9',
    padding: 15,
    marginVertical: 5,
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
  logout: {
    width: 100,
    height:30,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  }
});
