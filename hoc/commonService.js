import Router from '../hoc/withRouterCore.js';
import * as cookies from "js-cookie";
import * as localforage from "localforage";
import _ from "../lib/lodashCore";

export const isServer = typeof window === "undefined";

export function parse_url(url) { //解析url
  let pattern = /(\w+)=(\w+)/ig;//定义正则表达式
  let parames = {};//定义数组
  url.replace(pattern, function (a, b, c) {
    parames[b] = c;
  });
  return parames;//返回这个数组.
}

// 时间转换，输入时间戳，输出年月日
export function transDate(data) {
  const date = new Date(data * 1000);
  const month = date.toDateString().split(" ")[1];
  const day = date.getDate();
  const year = date.getFullYear();
  return {year, month, day};
}

// 數字小于10加0
export function addZero(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

// 获取cookie，TODO:逐步弃用，浏览器端cookie使用js-cookie，node端cookie已用中间件解析
export function getCookie(name, headers = {}) {
  const cookie = isServer ? headers.cookie : document.cookie;
  const data = parseCookie(cookie);
  if (data[name]) {
    const a = data[name].indexOf("{") >= 0 ?
      JSON.parse(data[name]) : data[name];
    return a;
  } else {
    return "";
  }
}

// 同上
export function delCookie(name) {

  let exp = new Date();
  exp.setTime(exp.getTime() - 100000000);
  let cval = getCookie(name);

  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

const pairSplitRegExp = /; */;

function tryDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}

// 解析cookie成字符串
export function parseCookie(str) {
  if (typeof str !== "string") {
    str = "";
    // throw new TypeError("argument str must be a string");
  }

  const obj = {};
  const pairs = str.split(pairSplitRegExp);
  for (let i in pairs) {
    const pair = pairs[i];
    let eq_idx = pair.indexOf("=");
    if (eq_idx < 0) {
      continue;
    }
    let key = pair.substr(0, eq_idx).trim();
    let val = pair.substr(++eq_idx, pair.length).trim();
    if ("\"" == val[0]) val = val.slice(1, -1);
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val);
    }
  }
  return obj;
}

/**
 *
 *img 拼接function
 * @export
 * @param {*} imgHost
 * @param {*} productId
 * @param {*} size
 * @param {*} imgTotal
 * @param {*} name
 * @returns
 */

// 浏览器端判断是否登录
export function loginOrNot() {
  const jwt = cookies.get('jwt');
  jwt ? null : Router.push({pathname: "/login", query: {url: Router.asPath}});
  return !!jwt;
}
export function loginOrNotNoJump() {
  const jwt = cookies.get('jwt');
  return !!jwt;
}

// 封装localforage的get，输出promise
export const getLocal = (key) => {
  return new Promise((resolve, reject) => {
    localforage.getItem(key, (err, coupon) => {
      if (err) {
        reject(err);
        return;
      }

      if (coupon) {
        resolve(coupon);
      } else {
        reject(err);
      }

    });
  });
};

// 封装localforage的set，输出promise
export const setLocal = (key, value) => {
  return new Promise((resolve, reject) => {
    localforage.setItem(key, value, (err) => {
      if (!err) {
        resolve(value);
      } else {
        reject(err);
      }
    });
  });
};

// 浏览器端读取url/:id 中的id
export function getId(pathName, url = window.location.pathname) {
  const reg = new RegExp(`${pathName}\/[0-9]*`);
  let arr = url.match(reg);
  if (!arr) {
    return false;
  }
  let id = arr[0];
  id = id.replace(pathName + "/", "");
  return parseInt(id);
}

// 浏览器端读取?后面的参数
export function getUrlData(pathName, url = window.location.search) {
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    theRequest.UrlData = url;
  }
  return theRequest;
}

// 获取元素到页面边缘的距离
export function getElementLenght(element) {
  const Data = {
    L:0,
    T:0
  };
  if(element){
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    let actualTop = element.offsetTop;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    Data.L = actualLeft;
    Data.T = actualTop;
  }

  return Data;
}

// 格式化时间，倒计时用
export function filterTime(lastTime) {
  if (typeof lastTime !== "number") {
    throw ("lastTime is not number");
  }
  if (lastTime < 0) {
    lastTime = 0;
  }
  const day = lastTime > 86400 ? Math.floor(lastTime / 86400) : 0;
  lastTime = lastTime - day * 86400;
  const hour = lastTime > 3600 ? Math.floor(lastTime / 3600) : 0;
  lastTime = lastTime - hour * 3600;
  const min = lastTime > 60 ? Math.floor(lastTime / 60) : 0;
  lastTime = lastTime - min * 60;
  return {
    day: addZero(day),
    hour: addZero(hour),
    min: addZero(min),
    second: addZero(lastTime),
  };
}


export function cutLetter(text) {
  if (text.length > 64) {
    return text.substring(0, 64) + "...";
  } else {
    return text;
  }
}


/**
 *
 *
 * @export
 * @param {number} stepsLength
 * @param {number} current
 * @param {func} changeStep
 * @returns
 */

// 输入非空数组或者字符串
export function arrOrStringNotEmpty(v) {
  if (typeof v === "string") return !!v;
  if (v instanceof Array && v[0]) return true;
  return false;
}

// 是否在范围内
export function inScope(v, {min, max}) {
  v = typeof (v) === "string" ? parseFloat(v) : v;
  if (v >= min && v <= max) {
    return true;
  }
  return false;
}

// 数组每个值是否在范围内
export function arrIsInScope(arr, scope) {
  const res = _.isArray(arr) ?
    arr.find(item => isInScope(item, scope)) :
    isInScope(arr, scope);
  if (res === 0) {
    return true;
  } else {
    return !!res;
  }
}

// 数组中是否有值在范围外
export function arrOutOfScope(arr, scope) {
  const res = _.isArray(arr) ?
    arr.find(item => outOfScope(item, scope)) :
    isInScope(arr, scope);
  if (res === 0) {
    return true;
  } else {
    return !!res;
  }
}

// 单个数组是否在范围外
export function outOfScope(v, scope) {
  const res = _.isArray(scope) ?
    scope.find(item => inScope(v, item)) :
    inScope(v, scope);
  if (res === 0) {
    return false;
  } else {
    return !res;
  }
}

// 单个值是否在范围内
export function isInScope(v, scope) {
  const res = _.isArray(scope) ?
    scope.find(item => inScope(v, item)) :
    inScope(v, scope);
  if (res === 0) {
    return true;
  } else {
    return !!res;
  }
}

// 空字符串，undefined转化为0
export function mapNullStrToZero(v) {
  if (typeof v === "string" && v === "") {
    return 0;
  } else if (typeof v === "string") {
    return parseFloat(v);
  }
  else if (typeof v === "number") {
    return v;
  } else if (typeof v === "undefined") {
    return 0;
  } else {
    return undefined;
  }
}


/*
 接受一个dom , 正方形展示宽高并取中间部分
*/
export function customerShowImgWH(e) {
  const W = e.target.naturalWidth;
  const H = e.target.naturalHeight;
  const M = (W - H) / 2;
  let V = 1;
  if (W > H) {
    e.target.style.height = "100%";
    e.target.style.width = "auto";
    V = e.target.height / H;
    e.target.style.marginLeft = -M * V + "px";
  } else {
    e.target.style.width = "100%";
    e.target.style.height = "auto";
    V = e.target.width / W;
    e.target.style.marginTop = M * V + "px";
  }
}


// 判断是否包含其中之一
export function includesOneOfArr(string, arr) {
  let res = false;
  const result = arr.filter(item => string.includes(item));
  res = _.isEmpty(result);
  return !res;
}

// 判断是否是IE
export function isIE() {
  if (typeof window.isIE === "boolean") {
    return window.isIE;
  }

  window.isIE = !!window.ActiveXObject || "ActiveXObject" in window;
  return window.isIE;
}

// 封装session
export function setSession(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (err) {

  }
}

export function getSession(key) {
  let result = undefined;
  try {
    result = window.sessionStorage.getItem(key) || undefined;
  } catch (error) {
    result = undefined;
  }
  return result;
}

export function removeSession(key) {
  try {
    window.sessionStorage.remove(key);
  } catch (error) {
    return undefined;
  }
}


/*
// 计算汇率，接受汇率信息和当前使用货币code，输出一个货币转化函数，美元=》其他货币
export const calcCurrencies = (rateData, currencyCode) => (value, company) => {
  const changeRateData = rateData[currencyCode];
  if (typeof value === "string") value = value.replace(/,/g, "");
  value = parseFloat(value * 100);
  let num = value * changeRateData.value;
  num = Math.round(num);
  let cents = num % 100;
  cents = cents < 10 ? "0" + cents : cents;
  num = Math.floor(num / 100).toString();
  for (let i = 0; i < Math.floor((num.length - (1 + i) / 3)); i++) {
    const a = num.substring(0, num.length - (4 * i + 3));

    if (a)
      num = num.substring(0, num.length - (4 * i + 3)) + changeRateData.thousands_point +
          num.substring(num.length - (4 * i + 3));
  }
  // 输出格式化的货币
  return `${changeRateData.symbol_left}${num}${changeRateData.decimal_point}${cents}${changeRateData.symbol_right} ${company?changeRateData.code:""}`;
};

// 输出格式化好的货币number
export const getCurrencyOnlyNumber = (rateData, currencyCode) => (value) => {
  const changeRateData = rateData[currencyCode];
  if (typeof value === "string") value = value.replace(/,/g, "");
  value = parseFloat(value);
  let num = value * changeRateData.value;
  num = Math.round(num * 100);
  let cents = num % 100;
  cents = cents < 10 ? "0" + cents : cents;
  num = Math.floor(num / 100).toString();

  return `${num}.${cents}`;
};

*/