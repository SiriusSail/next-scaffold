/**
 * 这个文件用于封装异步请求，全局处理error
 * **/
import axios from 'axios';
import {BASE_URL} from '../config/api';
 
import { isServer } from './commonService';
import Cookies from 'js-cookie';
// 建立一个axios实例
const instance = axios.create({
  timeout: 60000,
  baseURL: BASE_URL
});

// 请求拦截器
instance.interceptors.request.use((config)=>{
  // 发送之前做点啥，比如loading
  config.headers["language"] = "en";
  if (isServer){

  }else{
    // 登录验证
    // const jwt = Cookies.get('jwt');
    // if (jwt) {
    //   config.headers["jwt-auth"] = jwt;
    // }
  }

  return config;
},
error =>{
  // 请求错误
  return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use((res)=>{
  let result;
  switch (res.data.error) {
    case 0:
      result = res.data.data;
      break;
  // 各种请求问题
    default:
    result = Promise.reject(res.data.message);
      break;
  }
  return result;
}, 
error =>{
  // 返回状态码不为200的错误
  console.log(error, 'xxx'.repeat(100));
  return Promise.reject(error);
});
// 若有特殊需要，再封装
export function postWithlanguageId(url, params){
  return instance.post(url, params);
}
export default instance;