import instance from '../lib/axiosCore';
import {getCookie, delCookie} from '../lib/commonService';
import Cookie from 'js-cookie';
import {TEST} from './api'

const testAPI = (params) => {
  return instance.get(TEST, {params:params}).then(
    (data) => {
      console.log(data);
      return data;
    }, (error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

export {
  testAPI, //ajax测试api
}