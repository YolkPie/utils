import { getCookie, delCookie, setCookie } from './utils/cookies'
import { formatDate } from './utils/formatDate'
import { add, subtract, multiply, divide } from './utils/floatCalculate'
import {
  trimLeft,
  trimAll,
  trimRight,
  trimLandR,
  getGbLen,
  subGbString
} from './utils/string'
import {
  hasClass,
  addClass,
  removeClass,
  bottomVisible,
  elementIsVisibleInViewport,
  copy,
  scrollToTop,
  scrollTo,
  lockMaskScroll,
  closest
} from './utils/dom'
import { toFixed, formatNum, gcd, scm } from './utils/math'
import {
  getKeyByVal,
  getValByVal,
  pick,
  objectToObjArray,
  mixParams,
  listToHash,
  deepCopy
} from './utils/global'
import { getQuery, getHash } from './utils/url'
import { getType } from './depend/getType'
import { listener, on, off } from './utils/event'
import cache from './utils/cache'
import {
  isArrayLike
} from './utils/array'
import {
  isIphoneX,
  isSupportWebp,
  getEnv,
  getDevice
} from './utils/bom'
import {
  compose,
  curry
} from './utils/functional'
import { throttle, debounce, handleImgError } from './utils/tools'
import jsonpAdapter from './utils/axios-jsonp'
import rem from './utils/rem'
import fixMask from './utils/fixMask'

export {
  getCookie,
  delCookie,
  setCookie,
  formatDate,
  add,
  subtract,
  multiply,
  divide,
  trimLeft,
  trimRight,
  trimLandR,
  trimAll,
  getGbLen,
  subGbString,
  hasClass,
  addClass,
  removeClass,
  bottomVisible,
  elementIsVisibleInViewport,
  copy,
  scrollToTop,
  scrollTo,
  lockMaskScroll,
  closest,
  toFixed,
  getKeyByVal,
  getValByVal,
  pick,
  formatNum,
  gcd,
  scm,
  getQuery,
  getHash,
  objectToObjArray,
  mixParams,
  listToHash,
  deepCopy,
  getType,
  listener,
  on,
  off,
  cache,
  isArrayLike,
  isIphoneX,
  isSupportWebp,
  getEnv,
  getDevice,
  compose,
  curry,
  throttle,
  debounce,
  handleImgError,
  jsonpAdapter,
  rem,
  fixMask
}