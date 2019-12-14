/**
 * 公共接口转发
 * **/

const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = express.Router();
const connectServer = require("./nodeConstant.js");

const serverDomain = connectServer.domain;
const lang = connectServer.lang;


// 通用get接口，转接所有数据
router.get("*", async (req, res) => {
  let reqUrl = serverDomain + req.url;
  const langId = req.headers["language"];
  const realIp = req.headers['x-real-ip']|| '';
  const forwardedFor =  req.headers['x-forwarded-for'] || '';
  let headerObj = {
    "language": langId,
    "x-real-ip":realIp,
    "x-forwarded-for":forwardedFor
  }
  const getOpt = {
    url: reqUrl,
    method: "get",
    // data: reqData,
    headers: headerObj
  };
  const reqContentType = req.headers["content-type"];
  reqContentType ? getOpt.headers["content-type"] = reqContentType : null;
  // const reqJwt = req.headers["jwt-auth"];
  // reqJwt ? getOpt.headers["jwt-auth"] = reqJwt : null;
  axios(getOpt).then((sres) => {

    console.log(sres)
    const statusCode = sres.status;
    const contentType = sres.headers["content-type"];
    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
    }
    // else if (!/^application\/json/.test(contentType)) {
    //   error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
    // }
    if (error) {
      console.log(error, 'error'.repeat(10));
      res.status(statusCode).end(error);
      return;
    } else {
      // cover ie11 304缓存bug
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.status(200).json(sres.data);
    }
  }).catch(err => {
    console.log(err);
    console.log(`Got error: ${err.message}`);
    res.status(500).end(err.message);
  });
});

// 转发post Put Delete通用handle
function postPutDeleteHandle(method, req, res) {
  const reqUrl = serverDomain + req.url;
  const reqContentType = req.headers["content-type"];
  const langId = req.headers["language"] || lang;

  //接受登录信息
  // const reqJwt = req.headers["jwt-auth"] || req.cookies.jwt;

  const reqBody = req.body;
  // 解析body，获取参数
  const reqData = reqContentType && reqContentType.indexOf("json") !== -1 ? JSON.stringify(reqBody) : querystring.stringify(reqBody);
  // let data =  reqContentType.includes('multipart/form-data')? reqBody: reqData;
  // 转发用户真实ip
  const realIp = req.headers['x-real-ip']|| '';
  const forwardedFor =  req.headers['x-forwarded-for'] || '';
  let headerObj = {
    "language": langId,
    "x-real-ip":realIp,
    "x-forwarded-for":forwardedFor
  }


  const postOpt = {
    url: reqUrl,
    method: method,
    data: reqData,
    headers: headerObj
  };
  reqContentType ? postOpt.headers['Content-Type'] = reqContentType: null;
  // reqJwt ? postOpt.headers['jwt-auth'] = reqJwt : null;
  console.log("reqData:",postOpt);
  axios(postOpt).then(result => {
    const statusCode = result.status;
    const contentType = result.headers["content-type"];
    // 不为200抛出错误
    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
    } 
    // else if (!/^application\/json/.test(contentType)) {
    //   error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
    // }
    if (error) {

      res.status(statusCode).json(error);
      return;
    } else {
      res.status(200).json(result.data);
    }
  }).catch(err => {
    console.log(`Got error: ${err.message}`);
    res.status(500).end();
  });
}


// 通用post接口，转接所有数据
router.post("*", (req, res) => {
  postPutDeleteHandle("post", req, res);
});
// 通用PUT方法
router.put("*", (req, res) => {
  postPutDeleteHandle("put", req, res);
});
// 通用DELETE方法
router.delete("*", (req, res) => {
  postPutDeleteHandle("delete", req, res);
});
// 通用patch方法
router.patch("*", (req, res) =>{
  postPutDeleteHandle("patch", req, res);
});
module.exports = router;