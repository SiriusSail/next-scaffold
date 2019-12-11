import Head from 'next/head';
import React from 'react';

/**移动端公用引入部分**/

export default function MobileCon({children}){
  return (
    <React.Fragment>
      <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      {children}
    </React.Fragment>
  );
}