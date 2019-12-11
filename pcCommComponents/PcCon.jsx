/** pc端公用的引用部分 **/

import Head from 'next/head';
import React from 'react';

export default function PcCon({children}) {
  return (
    <React.Fragment>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      </Head>
      {children}
    </React.Fragment>
  );
}