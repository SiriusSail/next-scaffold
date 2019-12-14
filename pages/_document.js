import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { BASE_BASE_URL } from '../config/api';
import FONT_END_ENV from '../font_end_env.js';
/*
 * 通用head
 * @export
 * @class
 * @extends {Document}
 */

export default class extends Document {
  render() {
    // 环境变量
    const { isPc } = this.props.__NEXT_DATA__.props;
    return (
      <html lang="en">
        <Head>
          <base href={BASE_BASE_URL} />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover,user-scalable=no" />
          <meta name="format-detection" content="telephone=no" />
          {/* 开启dns 预解析 */}
          {/*<meta httpEquiv="x-dns-prefetch-control" content="on" />*/}
          {/* 增加dns 预解析 */}
          {/*<link rel="dns-prefetch" href={`${API_URL}`} />*/}
          {/*<link rel="dns-prefetch" href={`${SEVICE_URL}`} />*/}
          {/*<link rel="dns-prefetch" href={`${INVITE_URL}`} />*/}
          {/*<link rel="dns-prefetch" href={`${S3_BUCKET}`} />*/}
          {/*<link rel="dns-prefetch" href={`${IMG_HOST}`} />*/}
          <meta name="protected" content="true" />
          <script type="text/javascript" src={`/static/dist/${isPc?"pcStyle":"mStyle"}.bundle.js`} async></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `

            // 兼容到ie11
            if(typeof window.ActiveXObject === "function"){
              if(window.location.pathname === '/notsupport'){

              }else{
                window.location.href = '/notsupport'

                }
            }else{

          
          };
          `}} ></script>

        </Head>
        <body>

        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
            window.process = {};
            window.process.env = ${JSON.stringify(FONT_END_ENV())};
          `}} ></script>
          < Main />
          < NextScript />
        </body>
      </html>
    );
  }
}
