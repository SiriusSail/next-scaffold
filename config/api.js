/** 公用常量声明文件 **/

//请求头
const BASE_BASE_URL = typeof window === "undefined" ? process.env.BASE_URL : window.process.env.BASE_URL;

//请求头路径
const BASE_URL = BASE_BASE_URL + "remoteapi/";


//测试接口
const TEST = 'json/testAPI.json';

export {
  BASE_BASE_URL,
  BASE_URL,
  TEST

}
