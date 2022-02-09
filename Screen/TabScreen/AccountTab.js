import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AccountTab() {
    const [userid, setUserId]= useState('');
    const DOB = () => {
        if (userid.DOB != null) {
            return userid.DOB;
        }
        else {
            return '2021-12-16';
        }
    }

    const getuserid = () => {
        AsyncStorage.getItem('user_id')
        .then(value => {
         // userid = JSON.parse(JSON.parse(value).userInfo)[0]; 
         let result = JSON.parse(JSON.parse(value).userInfo)[0];
          setUserId(result);
        })
        .catch(error => {
          console.log(error);
        })
      };
    
      useEffect(()=>{
        getuserid();
      },[]);

  return (
      <View style={accountStyle.sideMenuContainer}>
          <Text style={accountStyle.profileHeaderText}>
              Thông tin tài khoản của bạn {userid.EMPL_NO}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Mã nhân viên ERP: {userid.EMPL_NO}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Mã nhân viên CMS: {userid.CMS_ID}
          </Text>          
          <Text style={accountStyle.profileHeaderText}>
              Tên đầy đủ: {userid.MIDLAST_NAME + " " + userid.FIRST_NAME}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Ngày tháng năm sinh: {DOB().slice(0, 10)}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Quê quán: {userid.HOMETOWN}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Địa chỉ thường trú: {userid.ADD_VILLAGE}-{userid.ADD_COMMUNE}-{userid.ADD_DISTRICT}-{userid.ADD_PROVINCE}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Bộ phận chính: {userid.MAINDEPTNAME}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Bộ phận phụ: {userid.SUBDEPTNAME}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Vị trí làm việc: {userid.WORK_POSITION_NAME}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Nhóm điểm danh: {userid.ATT_GROUP_CODE}
          </Text>
          <Text style={accountStyle.profileHeaderText}>
              Chức vụ: {userid.JOB_NAME}
          </Text>
      </View>
  );userid
}
const accountStyle = StyleSheet.create({
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
      alignContent:'space-around'
    }, 
  });