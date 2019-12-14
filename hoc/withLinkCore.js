/**自定义Link。以及路由别名组件**/

import NextLink from "next/link";

export const oldPathNewMap = {
  "/": { oldPath: "index", newPath: "/", query: {} }
};


export default function Link(props) {
  const { href, as } = props;

  let hrefObj, asPath, converQuery, converHref;
  if (typeof href === 'string') {
    converHref = href.split("?")[0];
    converQuery = parse_url(href);
  } else if (typeof href === "object") {
    const { pathname, query } = href;
    converHref = pathname.split("?")[0];
    converQuery = { ...parse_url(pathname), ...query };
  }
  const conversionObj = conversion({ href: converHref ? converHref : "", query: converQuery, as: as ? as : href });
  asPath = conversionObj.asPath;
  hrefObj = { pathname: conversionObj.pathname, asPath: conversionObj.asPath, query: conversionObj.query };
  if (typeof asPath === 'string' &&
    asPath.indexOf('/') !== 0 &&
    asPath.indexOf('https://') === -1 &&
    asPath.indexOf('http://') === -1 &&
    asPath.indexOf('javascript:void(0)') === -1) {
    asPath = `/${asPath}`;
  } else {
  }
  return (
    <NextLink
      {...props}
      as={asPath}
      href={hrefObj}
    >
      {props.children}
    </NextLink>
  );
}

export function conversion({ href = '', query, as }) {
  let pc = "";
  href = url_(href);

  let HREF = href;

  if (href.indexOf('/pc') !== -1) {
    pc = '/pc';
    HREF = href.replace("/pc", "");//清除/pc/
  }
  const path = HREF.split("?")[0];
  let asPath = as ? as : href;
  let pathname = path;
  query = { ...parse_url(href), ...query };
  let asQuery = {};

  // debugger
  if (oldPathNewMap[path]) {//判断是否需要 改变路由的别名
    asPath = oldPathNewMap[path].oldPath;

    if (typeof asPath === "object") {
      asPath.query = { ...asPath.query, ...asQuery };
      asPath.pathname = url_(asPath.pathname);
    } else {
      for (let name in asQuery) {
        asPath += `${asPath.indexOf("?") === -1 ? "?" : "&"}${name}=${asQuery[name]}`;
      }
      asPath = url_(asPath);
    }

  }
  pathname = path;

  return {
    pathname: path, //真实路由
    asPath: asPath, //路由的别名
    query: query
  };
}


function url_(url) {
  if (url[0] !== "/") {
    url = "/" + url;
  }
  return url;
}

function parse_url(url) { //解析url
  let pattern = /(\w+)=(\w+)/ig;//定义正则表达式
  let parames = {};//定义数组
  url.replace(pattern, function (a, b, c) {
    parames[b] = c;
  });
  return parames;//返回这个数组.
}