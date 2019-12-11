import router, {RouterProps} from 'next/router';
import * as route from 'next/router'; 
import {oldPathNewMap, conversion} from './withLinkCore';

// const router = {
//   ...Router, 
//   pathname:isSv? '':Router.pathname,
//   query:isSv?'':Router.query
// };
const getPathObj = (type, args, asArgs)=>{
  let obj = {};
  if(type === 'string') {
    obj = conversion({href:args, as:asArgs});
  } else if(type === 'object'){
    asArgs = asArgs|| {};
    obj = conversion({href:args.pathname, query:args.query, as:asArgs.pathname});
  } else{
    console.warn('path data format is wrong, only be object or string!');
  }
  return obj;
};
class Router {
  get pathname(){
    return router.pathname;
  }
  get query(){
    return router.query;
  }
  get asPath(){
    return router.asPath;
  }
  push(args, asArgs){
    const type = typeof args;
    let obj = getPathObj(type, args, asArgs);
    window.rout = router;
    let asObj = {};
    if(typeof obj.asPath === 'object'){
      obj.asPath.query = obj.asPath.query || {};
      asObj = {...obj.asPath, query:{...obj.asPath.query}};
    }else{
      obj.query = obj.query || {};
      asObj = {pathname:obj.asPath, query:{...obj.query} || {}};
    }
    // debugger
    if(asObj.query.id) delete asObj.query.id;
    return router.push(obj, asObj);
  }
  beforePopState = router.beforePopState;
  onRouteChangeStart = router.onRouteChangeStart;
  onRouteChangeComplete = router.onRouteChangeComplete;
  onRouteChangeError = router.onRouteChangeError;

  replace(args, asArgs){
    const type = typeof args;
    // if(args.transd) return;
    let obj = getPathObj(type, args, asArgs);
    window.rout = router;
    let asObj = {pathname:obj.asPath, query:obj.query || {}};
    if(asObj.query.id) delete asObj.query.id;
    return router.push(obj, asObj);
  }
}

const r = new Router();
export default r;