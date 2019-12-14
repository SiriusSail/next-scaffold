// polyfill.js&& lodash

import {isServer} from '../hoc/commonService';
/* eslint no-extend-native: 0 */
import includes from 'core-js/fn/array/virtual/includes';
import strIncludes from 'core-js/fn/string/virtual/includes';
import find from 'core-js/fn/array/virtual/find';
import findIndex from 'core-js/fn/array/virtual/find-index';
import repeat from 'core-js/fn/string/repeat';
import assign from 'core-js/fn/object/assign';
import 'core-js/fn/object/assign';
import Map from 'core-js/es7/map';
import Set from 'core-js/es6/set';
import Promise from 'core-js/es6/promise';
import Symbo from 'core-js/es7/symbol';
import Symbom from 'core-js/es6/symbol';
// import Symb from 'core-js/es6/symbol';
if(isServer){

}else{
  if(!Map)window.Map = Map;
  if(!Set)window.Set = Set;
  if(!Promise)window.Promise = Promise;
  if(!Symbo.iterator){
    Symbo.iterator = Symbom.iterator;
    window.Symbol = Symbo;
  }
}
// This files runs at the very beginning (even before React and Next.js core)
Array.prototype.includes = includes;
Array.prototype.find = find;
Array.prototype.findIndex = findIndex;
String.prototype.includes = strIncludes;
String.prototype.repeat = repeat;
Object.assign = assign;

