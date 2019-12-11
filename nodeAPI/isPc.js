const { parse } = require('url');

module.exports = function (req){
  const parsedUrl = parse(req.url, true);
  const {pathname, query} = parsedUrl;
  const ua = req.headers['user-agent'];
  let isPc;
  let realPathname = pathname;
  if (/Mobile/i.test(ua)) {
    realPathname = pathname === '/' ? '/m' : `/m${pathname}`;
    isPc = false;
  } else {
    realPathname = pathname === '/' ? '/pc' : `/pc${pathname}`;
      isPc = true;
  }
  // console.log(req.url, ua, isPc);

  return{isPc, realPathname, query, parsedUrl};
};