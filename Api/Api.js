import axios from 'axios';
import {Alert} from 'react-native';
axios.defaults.withCredentials = true;
/* const API_URL = "http://14.160.33.94:3020/api"; */
const API_URL = 'http://14.160.33.94:100/api';
export function login(user, pass) {
  axios
    .post(API_URL, {
      command: 'login',
      user: user,
      pass: pass,
    })
    .then(response => {
      var Jresult = response.data;
      console.log('Status = ' + Jresult.tk_status);
      console.log('Tokent content = ' + Jresult.token_content);
      if (Jresult.tk_status == 'ok') {
        return 1;
      } else {
        return 0;
      }
    })
    .catch(error => {
      console.log(error);
      return 0;
    });
}

export async function checkLogin() {
  let data = await axios.post(API_URL, {
    command: 'checklogin',
  });
  return data;
}

export async function generalQuery(command, queryData) {
  let data = await axios.post(API_URL, {
    command: command,
    DATA: queryData,
  });
  return data;
}
