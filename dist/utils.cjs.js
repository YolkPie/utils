'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description 获取类型
 * @param {*} value 要获取类型的值
 * @returns {*|string} 数据类型：如 String, Number, Object, Array, Null, Date, Symbol
 */
function getType (value) {
  const o = {};
  const type = o.toString.call(value);
  const typeArr = /^\[object (\w+)\]$/.exec(type);
  return typeArr[1]
}

/**
 * @fileOverview cookie相关处理函数
 * @module cookie
 */

/**
 * @description 获取cookie
 * @author yujihu
 * @param {string} key - 要获取的某个cookie键值
 * @returns {string} cookie值
 * @example
 * getCookie('pin')
 */
function getCookie (key) {
  const cookie = document.cookie;
  if (!key) return cookie
  const cookies = cookie.split('; ');
  for (const item of cookies) {
    const cookieArr = /^([^=]+)=([^=]+)$/.exec(item);
    if (cookieArr && cookieArr[1] === key) {
      return unescape(cookieArr[2])
    }
  }
  return ''
}

/**
 * @description 设置cookie
 * @author yujihu
 * @param {string} key - cookie名称
 * @param {string} value - cookie值
 * @param {string|number|date} expires - 过期时间，支持传入'd30','h12','m20'代表有效期30天、12小时、20分
 * @returns {undefined}
 * @example
 * setCookie('pin', 'test_pop_115', 'd30') //=> 有效期30天
 * setCookie('pin', 'test_pop_115', 'h12') //=> 有效期12小时
 * setCookie('pin', 'test_pop_115', 'm2') //=> 有效期2分钟
 */
function setCookie (key, value, expires) {
  if (!key || !value) return
  const getExpires = time => {
    const type = getType(time);
    let expiresStr = ';expires=';
    if (['Date', 'Number'].includes(type)) {
      expiresStr += new Date(time).toGMTString();
    } else if (type === 'String') {
      // 支持传入'd30', 'h12', 'm20'
      const timeType = /^(d|h|m)(\d+)$/.exec(time);
      if (!timeType) return ''
      const date = new Date();
      switch (timeType[1]) {
        case 'd':
          date.setTime(date.getTime() + 3600 * 1000 * 24 * +timeType[2]);
          break
        case 'h':
          date.setTime(date.getTime() + 3600 * 1000 * +timeType[2]);
          break
        default:
          date.setTime(date.getTime() + 60 * 1000 * +timeType[2]);
      }
      expiresStr += date.toGMTString();
    } else {
      expiresStr = '';
    }
    return expiresStr
  };
  const expiresTime = expires ? getExpires(expires) : '';
  document.cookie = key + '=' + escape(value) + expiresTime;
}

/**
 * @description 删除cookie
 * @author yujihu
 * @param {string} key - 要删除的cookie键值
 * @returns {undefined}
 * @example
 * getCookie('pin') //=> test_pop_115
 * delCookie('pin')
 * getCookie('pin') //=> ''
 */
function delCookie (key) {
  if (!key) return
  const currentCookie = getCookie(key);
  const date = new Date();
  const expiresTime = date.setTime(date.getTime() - 86400000);
  const expiresStr = ';expires=' + new Date(expiresTime).toGMTString();
  document.cookie = key + '=' + escape(currentCookie) + expiresStr;
}

/**
 * @description 自定义返回值的替换函数
 * @author yujihu
 * @param {Function} fn 自定义替换值的函数，会以匹配到的字符串为参数调用该函数
 * @returns {Function} 返回一个供正则匹配替换使用函数，
 */
function replaceByMath (fn) {
  return (match, str) => {
    if (!str) return match
    return fn(str)
  }
}

/**
 * @description 格式化日期
 * @author yujihu
 * @param {Date|string|number} date - 日期或者时间戳
 * @param {string} format - 日期格式
 * @returns {string} 格式化后的日期
 * @example
 * formatDate('2018-9-9') //=> 2018-09-09
 * formatDate(new Date('2018-09-21'), 'YY-M-D') //=> 18-9-21
 * formatDate(new Date('2018-09-21'), 'YYYY 年 M 月 D 日 周WW') //=> 2018 年 9 月 21 日 周五
 */
function formatDate (date, format = 'YYYY-MM-DD') {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const week = _date.getDay();
  const hour = _date.getHours();
  const min = _date.getMinutes();
  const sec = _date.getSeconds();
  const upWeek = ['日', '一', '二', '三', '四', '五', '六'];
  // 两位数补全
  const getReal = number => {
    const full = number > 9 ? number + '' : '0' + number;
    return replaceByMath(str => {
      return str.length === 2 ? full : number + ''
    })
  };
  const res = format
    .replace(
      /([Y]+)/g,
      replaceByMath(str => {
        return str.length === 4 ? year + '' : (year + '').slice(2)
      })
    )
    .replace(
      /([W]+)/g,
      replaceByMath(str => {
        return str.length === 2 ? upWeek[week] : week + ''
      })
    )
    .replace(/([M]+)/g, getReal(month))
    .replace(/([D]+)/g, getReal(day))
    .replace(/([h]+)/g, getReal(hour))
    .replace(/([m]+)/g, getReal(min))
    .replace(/([s]+)/g, getReal(sec));
  return res
}

/**
 * @description 获取小数位数
 * @param {number|string} value 被获取的值：string类型只支持数字字符串,例"123"
 * @returns {numbe} 小数位数
*/
function getDecimalLen (value) {
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error('参数类型错误')
  }
  const _len = value.toString().split('.')[1]
    ? value.toString().split('.')[1].length
    : 0;
  return _len
}

/**
 * @fileOverview 数值计算处理函数(解决了浮点数计算精度问题)
 * @module floatCalculate
 */

/**
 * @description 两个数相加
 * @author yujihu
 * @param {number} arg1 - 相加的第一个数
 * @param {number} arg2 - 相加的第二个数
 * @returns {number} 返回总和
 * @example
 * add(0.1, 0.2) //=> 0.3
 * add(10, 20) // => 30
 */
function add (arg1, arg2) {
  let _len1, _len2;
  try {
    _len1 = getDecimalLen(arg1);
    _len2 = getDecimalLen(arg2);
  } catch (e) {
    // console.log(e)
  }
  const maxLen = Math.max(_len1, _len2);
  const mi = Math.pow(10, maxLen);
  const res = ((arg1 * mi + arg2 * mi) / mi).toFixed(maxLen);
  return +res
}

/**
 * @description 两个数相减
 * @author yujihu
 * @param {number} arg1 - 相减的第一个数
 * @param {number} arg2 - 相减的第二个数
 * @returns {number} 返回差值
 * @example
 * subtract(1.5, 1.2) //=> 0.3
 * subtract(4, 2) //=> 2
 */
function subtract (arg1, arg2) {
  return add(arg1, -arg2)
}

/**
 * @description 两个数相乘
 * @author yujihu
 * @param {number} arg1 - 相乘的第一个数
 * @param {number} arg2 - 相乘的第二个数
 * @returns {number} 返回乘积
 * @example
 * multiply(19.9, 100) //=> 1990
 * multiply(11, 12) // => 132
 */
function multiply (arg1, arg2) {
  let _len1, _len2;
  const _arg1 = arg1.toString();
  const _arg2 = arg2.toString();
  try {
    _len1 = getDecimalLen(_arg1);
    _len2 = getDecimalLen(_arg2);
  } catch (e) {
    // console.log(e)
  }
  const maxLen = _len1 + _len2;
  const res =
    (_arg1.replace('.', '') * _arg2.replace('.', '')) / Math.pow(10, maxLen);
  return +res
}

/**
 * @description 两个数相除
 * @author yujihu
 * @param {number} arg1 - 相除的第一个数
 * @param {number} arg2 - 相除的第二个数
 * @returns {number} 返回商数
 * @example
 * divide(0.3, 0.1) //=> 3
 * divide(30, 5) //=> 6
 */
function divide (arg1, arg2) {
  let _len1, _len2;
  const _arg1 = arg1.toString();
  const _arg2 = arg2.toString();
  try {
    _len1 = getDecimalLen(_arg1);
    _len2 = getDecimalLen(_arg2);
  } catch (e) {
    // console.log(e)
  }
  const m = _len2 - _len1;
  const res = (_arg1.replace('.', '') / _arg2.replace('.', '')) * Math.pow(10, m);
  return +res
}

/**
 * @fileOverview 字符串相关处理函数
 * @module string
 */

/**
 * @description 去除字符串左边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimLeft("   123   ") //=> "123   "
 * trimLeft("aaa123aaaa", "a") // => "123aaaa"
 */
function trimLeft (str, char = ' ') {
  try {
    const regExp = new RegExp(char + '*');
    return str.replace(regExp, '')
  } catch (e) {
    // console.log(e)
  }
}

/**
 * @description 去除字符串右边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimRight("   123   ") //=> "   123"
 * trimRight("aaa123aaaa", "a") // => "aaa123"
 */
function trimRight (str, char = ' ') {
  try {
    const regExp = new RegExp(char + '*$');
    return str.replace(regExp, '')
  } catch (e) {
    // console.log(e)
  }
}

/**
 * @description 去除字符串中所有要去除的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimAll("  1  2  3   ") //=> "123"
 * trimAll("aaa12aa3aaaa", "a") // => "123"
 */
function trimAll (str, char = ' ') {
  try {
    const regExp = new RegExp(char + '*', 'g');
    return str.replace(regExp, '')
  } catch (e) {
    // console.log(e)
  }
}

/**
 * @description 去除字符串左边和右边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimLandR("   123   ") //=> "123"
 * trimLandR("aaa123aaa", "a") // => "123"
 */
function trimLandR (str, char = ' ') {
  try {
    const regExp = new RegExp('^' + char + '*|' + char + '*$', 'g');
    return str.replace(regExp, '')
  } catch (e) {
    // console.log(e)
  }
}

/**
 * @description 判断字符长度，区分中英文
 * @param {String} str - 字符串
 * @returns {Number} - 返回字符长度
 */
function getGbLen (str) {
  let len = 0;
  const content = str || '';
  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) > 127 || content.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len
}

/**
 * @description 截取字符，区分中英文
 * @param {String} str - 字符串
 * @param {Number} len - 字符串截取长度
 * @returns {String} - 返回截取后字符
 */
function subGbString (str, len) {
  // eslint-disable-next-line
  const regexp = /[^\x00-\xff]/g; // 正则表达式匹配中文
  // 当字符串字节长度小于指定的字节长度时
  if (str.replace(regexp, 'aa').length <= len) {
    return str
  }
  // 假设指定长度内都是中文
  const m = Math.floor(len / 2);
  for (let i = m, j = str.length; i < j; i++) {
    // 当截取字符串字节长度满足指定的字节长度
    if (str.substring(0, i).replace(regexp, 'aa').length >= len) {
      return str.substring(0, i)
    }
  }
}

/**
 * @fileOverview dom相关处理函数
 * @module Dom
 */

/**
 * @description 判断元素是否包含类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要查找的类名
 * @return {boolean} 返回true或false
 */
function hasClass (target, className) {
  if (target.classList) {
    return target.classList.contains(className)
  } else {
    const dom =
      getType(target) === 'String' ? document.querySelector(target) : target;
    if (!dom) return false
    return ` ${dom.className} `.indexOf(` ${className} `) > -1
  }
}

/**
 * @description 添加class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要添加的类名
 * @returns {*} none
 */
function addClass (target, className) {
  if (!target || !className) return
  if (!hasClass(target, className)) {
    if (target.classList) {
      target.classList.add(className);
    } else {
      const dom =
        getType(target) === 'String' ? document.querySelector(target) : target;
      if (!dom) return
      const currentCls = dom.className;
      dom.className = `${currentCls} ${className}`;
    }
  }
}

/**
 * @description 移除class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要移除的类名
 * @returns {*} none
 */
function removeClass (target, className) {
  if (!target || !className) return
  if (hasClass(target, className)) {
    if (target.classList) {
      target.classList.remove(className);
    } else {
      const dom =
        getType(target) === 'String' ? document.querySelector(target) : target;
      /* istanbul ignore next */
      if (!dom) return
      const currentCls = dom.className;
      const clsArr = currentCls.split(' ');
      const resArr = clsArr.filter(item => item !== className);
      dom.className = resArr.join(' ');
    }
  }
}

/**
 * @description 是否到达页面底部
 * @param {number} [offset=0] 距离页面底部的偏移
 * @returns
 */
const bottomVisible = (offset = 0) => {
  return Math.ceil(document.documentElement.clientHeight + window.scrollY) + offset >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
};

/**
 * @description 判断元素是否在可视范围内
 * @param {*} el 页面元素
 * @param {boolean} [partiallyVisible=false] 是否为部分可见
 * @returns
 */
function elementIsVisibleInViewport (el, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect();

  return partiallyVisible
    ? ((top > 0 && top < window.innerHeight) ||
        (bottom > 0 && bottom < window.innerHeight)) &&
        ((left > 0 && left < window.innerWidth) || (right > 0 && right < window.innerWidth))
    : top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth
}

/**
 * @description 复制文本
 * @param {*} str
 */
function copy (str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  el.style.top = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

/**
 * @description 返回页面顶部动画
 */
const scrollToTop = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, scrollTop - scrollTop / 8);
  } else {
    window.cancelAnimationFrame(scrollToTop);
  }
};

/**
 * @description 滚动到页面指定位置
 * @param scrollTop
 */
const scrollTo = scrollTop => {
  let topTimer = null;
  window.cancelAnimationFrame(topTimer);
  topTimer = window.requestAnimationFrame(function fn () {
    const oTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (oTop > scrollTop) {
      if (oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop =
          oTop - Math.floor((oTop - scrollTop) / 3);
        topTimer = window.requestAnimationFrame(fn)
        ;(oldTop => {
          if (Math.abs(oldTop - oTop) <= 2) {
            window.cancelAnimationFrame(topTimer);
          }
        })(document.documentElement.scrollTop || document.body.scrollTop);
      } else {
        window.cancelAnimationFrame(topTimer);
      }
    } else if (oTop < scrollTop) {
      document.body.scrollTop = document.documentElement.scrollTop =
        oTop + Math.ceil((scrollTop - oTop) / 3);
      topTimer = window.requestAnimationFrame(fn)
      ;(oldTop => {
        if (Math.abs(oldTop - oTop) <= 2) {
          window.cancelAnimationFrame(topTimer);
        }
      })(document.documentElement.scrollTop || document.body.scrollTop);
    } else {
      window.cancelAnimationFrame(topTimer);
    }
  });
};

/**
 * @description: 禁止页面滚动/允许页面滚动 需要为body添加fixed样式
 * @param {type}
 * @returns
 */
const lockMaskScroll = (bodyCls => {
  let scrollTop;
  let lockedCount = 0;
  return {
    afterOpen: function () {
      lockedCount++;
      if (document.body.classList.contains(bodyCls)) return
      scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function () {
      if (--lockedCount > 0) return
      if (document.body.classList.contains(bodyCls)) {
        document.body.classList.remove(bodyCls);
        document.scrollingElement.scrollTop = scrollTop;
      }
    }
  }
})('dialog-open');

/**
 * @fileOverview 数字相关处理函数
 * @module math
 */

/**
 * @description 数值格式化
 * @param {string} num - 要格式化的数字
 * @param {string} char - 格式化字符
 * @param {string} pre - 首位格式化字符，默认为''
 * @returns {string}  返回格式化后的数字字符串
 * @example
 * formatNum(123456, ',') //=> "123,456"
 * formatNum("12345678", ",", '$') // => "$12,345,678"
 * formatNum("12345678", "", '$') // => "$12345678"
 * formatNum("12345678.8983", ",", '$') // => "$12,345,678.8983"
 */
function formatNum (num, char, pre = '') {
  if (
    (typeof num !== 'number' && typeof num !== 'string') ||
    char === undefined || char === null
  ) {
    return num
  }
  let res = '';
  const _strList = num.toString().split('.');
  let decimal = _strList[1];
  decimal = decimal || '';
  const formatStr = _strList[0]
    .replace(/(?!^)(?=(\d{3})+$)/g, char)
    .replace(/^/, pre);
  res = decimal ? formatStr + '.' + decimal : formatStr;
  return res
}

/**
 * @description 浮点数保留格式
 * @param {string|number} num - 要格式化的数字
 * @param {number} len - 保留位数，大于等于0
 * @param {string} type - 保留格式，可选'ceil' 'floor' 'round',对小数进行格式保留
 * @returns {string}  返回格式化后的数字
 * @example
 * toFixed(123.23, 3) //=> "123.230"
 * toFixed("123.234", 2, 'ceil') // => "123.24"
 * toFixed("123.234", 2, 'floor') // => "123.23"
 * toFixed("123.234", 2, 'round') // => "123.23"
 * toFixed("123.235", 2, 'round') // => "123.24"
 */
function toFixed (num, len, type = '') {
  if ((typeof num !== 'number' && typeof num !== 'string') || len < 0) {
    return num
  }
  const numList = num.toString().split('.');
  const decimal = numList[1];
  const _len = decimal ? decimal.length : 0;
  if (_len <= len) {
    return num.toFixed(len)
  } else {
    let res, nextBit;
    const initNum =
      numList[0] + '' + decimal.substr(0, len) + '.' + decimal.substr(len);
    switch (type) {
      case 'ceil':
        res = Math.ceil(initNum) / Math.pow(10, len);
        break
      case 'floor':
        res = Math.floor(initNum) / Math.pow(10, len);
        break
      case 'round':
        nextBit = decimal[len];
        if (+nextBit >= 5) {
          res = Math.ceil(initNum) / Math.pow(10, len);
        } else {
          res = Math.floor(initNum) / Math.pow(10, len);
        }
        break
      default:
        res = num;
    }
    return res.toString()
  }
}

/**
 * @description 最大公约数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最大公约数
 */
function gcd (num1, num2) {
  let temp = 0;
  while (num2 !== 0) {
    temp = num1 % num2;
    num1 = num2;
    num2 = temp;
  }
  return num1
}

/**
 * @description 最小公倍数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最小公倍数
 */
function scm (num1, num2) {
  return (num1 * num2) / gcd(num1, num2)
}

/**
 * @description 根据键值获取键名
 * @param {number|string} val - 键值
 * @param {object} obj - 被查找的对象
 * @returns {string}  返回键值对应的键名
 * @example
 * getKeyByVal(123, {name: 123}) //=> "name"
 */
function getKeyByVal (val, obj) {
  if (getType(obj) !== 'Object') {
    /* istanbul ignore next */
    return ''
  }
  const keys = Object.keys(obj);
  let res = '';
  for (const i of keys) {
    if (obj[i] === val) {
      res = i;
      break
    }
  }
  return res
}

/**
 * @description 根据键值获取同个对象中指定键名的值
 * @param {string|number} val - 查找的键值
 * @param {array} list - 对象数组[{},{}]
 * @param {object} field - 键名设置对象，默认为{key: 'key', value: 'value'}
 * @returns {string|number} 返回被查找的键值
 * @example
 * getValByVal(12, [{name: 'jad', age: 12}], {key: 'name', value: 'age'}) //=> "jad"
 * getValByVal(2, [
            {key: '审核通过', value: 2},
            {key: '审核驳回', value: -2},
            {key: '待审核', value: 0},
            {key: '下线', value: -3},
        ]) //=> "审核通过"
 */
function getValByVal (val, list, field) {
  const defaultField = { key: 'key', value: 'value' };
  const fields = Object.assign({}, defaultField, field);
  try {
    for (const item of list) {
      if (item[fields.value] === val) {
        return item[fields.key]
      }
    }
  } catch (e) {
    /* istanbul ignore next */
    // console.log(e);
  }
}

/**
 * @description 创建一个从 object 中选中的属性的对象
 * @param {object} obj - 来源对象
 * @param {array} props - 要选中的属性名
 * @returns {object} 返回新对象
 * @example
 * pick([{name: 'jad', age: 12, sex: '男'}], ['name', 'sex']) //=> {name: 'jad', sex: '男'}
 */
function pick (obj, props) {
  if (getType(obj) !== 'Object' && getType(props) !== 'Array') {
    /* istanbul ignore next */
    return
  }
  const res = {};
  props.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = obj[key];
    }
  });
  return res
}

/**
 * @description 将对象转换为对象数组，数组项中内容为原有的键及值，对应的key由参数决定
 * @param {Object} obj 待转换对象
 * @param {String} keyConvert 对象key值转换为对象数组后，值对应的key
 * @param {String} valueConvert 对象value值转换为对象数组后，值对应的key
 * @returns {Array} 返回对象数组
 */
function objectToObjArray (obj, keyConvert, valueConvert) {
  if (
    getType(obj) !== 'Object' ||
    getType(keyConvert) !== 'String' ||
    getType(valueConvert) !== 'String'
  ) {
    console.warn('参数格式错误！');
    return []
  }
  return Object.entries(obj).map(item => {
    const obj = {};
    obj[keyConvert] = item[0];
    obj[valueConvert] = item[1];
    return obj
  })
}

/**
 * @description 深拷贝
 * @param {*} val 待转换值
 * @returns {*} 返回值
 */
function deepCopy (val) {
  const type = getType(val);
  if (type !== 'Object' && type !== 'Array') {
    return val
  }
  const result = type === 'Array' ? [] : {};
  for (const i in val) {
    if (Object.prototype.hasOwnProperty.call(val, i)) {
      if (
        val[i] &&
        (getType(val[i]) === 'Object' || getType(val[i]) === 'Array')
      ) {
        result[i] = deepCopy(val[i]);
      } else {
        result[i] = val[i];
      }
    }
  }
  return result
}

/**
 * @description 混合为真实请求的参数
 * @param {Object} params 接口参数
 * @param {Object} paramsMap 参数映射 - e.g {businessType: 'bussinessType', type: 'tabType'}
 * @returns {Object} 真实请求的对象 - e.g {bussinessType: 0, tabType: 2}
 * @example
 * mixParams({status: 0, type: 2}, {type: 'businessType', status: 'status'}) //=> {businessType: 2, status: 0}
 */
function mixParams (params, paramsMap) {
  const keys = Object.keys(params);
  if (!keys.length) return params
  return keys.reduce((pre, item) => {
    const key = paramsMap[item] || item;
    pre[key] = params[item];
    return pre
  }, {})
}

/**
 * @description 将复杂数组根据某个键值转化为对象
 * @param {Array} list 数组
 * @param {String} key 键值名称
 * @returns {Object} 转化后的对象
 * @example
 * listToHash([{label: '审核通过', value: 1}, {label: '驳回', value: -1}], 'value')
 */
function listToHash (list, key) {
  return list.reduce((pre, item) => {
    const objKey = item[key];
    if (objKey !== undefined) {
      pre[objKey] = item;
    }
    return pre
  }, {})
}

/**
 * @fileOverview url相关处理函数
 * @module urls
 */

/**
 * @description 获取url查询内容
 * @param {string} name - 要获取的查询字段
 * @returns {*} 如果传入name则返回它的值，不传则返回query组合对象
 */
function getQuery (name) {
  let search = window.location.search.slice(1);
  if (!search) {
    search = window.location.href.split('?')[1];
  }
  if (!search) return ''
  const querys = search.split('&');
  const res = querys.reduce((pre, current) => {
    const currentArr = current.split('=');
    pre[currentArr[0]] = decodeURIComponent(currentArr[1]);
    return pre
  }, {});
  return name ? res[name] : res
}

/**
 * @description 获取url锚点
 * @returns {string} 返回最后面一个#后的值，没有时返回空字符串
 */
function getHash () {
  const hash = window.location.hash;
  if (!hash) return ''
  const resArr = /#([^#]+)$/.exec(hash);
  return resArr ? resArr[1] : ''
}

/**
 * @fileOverview 事件处理相关函数
 * @module Event
 */

/**
 * @description 事件监听器
 * @param {HTMLElement|window} el 监听的dom
 * @param {String} event 事件名称
 * @param {Function} cb 回调函数
 * @returns {Object} {{remove(): void}} 包含移除事件的对象
 */
function listener (el, event, cb) {
  if (el.addEventListener) {
    el.addEventListener(event, cb, false);
    return {
      remove () {
        el.removeEventListener(event, cb, false);
      }
    }
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, cb);
    return {
      remove () {
        el.detachEvent('on' + event, cb);
      }
    }
  }
}

/**
 * @description 绑定事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    }
  }
})();

/**
 * @description 解绑事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    }
  }
})();

/**
 * @fileOverview 本地存储处理操作封装
 * @module cache
 */

const __session__ = window.sessionStorage;
const __local__ = window.localStorage;

const TYPES = ['session', 'local'];
const DEFAULT_CACHE = TYPES[0];

const cache = {
  set: (key, value, type = DEFAULT_CACHE) => {
    try {
      !(type in TYPES) && (type = DEFAULT_CACHE);
      cache[type].set(key, value);
      return cache[type]
    } catch (e) {
      return cache[type]
    }
  },
  get: (key, type = DEFAULT_CACHE) => {
    try {
      !(type in TYPES) && (type = DEFAULT_CACHE);
      return cache[type].get(key)
    } catch (e) {
      return null
    }
  },
  clear: (type = DEFAULT_CACHE) => {
    try {
      !(type in TYPES) && (type = DEFAULT_CACHE);
      cache[type].clear();
      return cache[type]
    } catch (e) {
      return cache[type]
    }
  },
  remove: (key, type = DEFAULT_CACHE) => {
    try {
      cache[type].remove(key);
      return cache
    } catch (e) {
      return cache
    }
  },
  session: {
    set: (key, value) => {
      try {
        __session__.setItem(key, JSON.stringify(value));
        return cache.session
      } catch (e) {
        return cache.session
      }
    },
    get: key => {
      try {
        const value = __session__.getItem(key);
        return key && JSON.parse(value)
      } catch (e) {
        return null
      }
    },
    remove: key => {
      try {
        __session__.removeItem(key);
        return cache.session
      } catch (e) {
        return cache.session
      }
    },
    clear: () => {
      try {
        __session__.clear();
        return cache.session
      } catch (e) {
        return cache.session
      }
    }
  },
  local: {
    set: (key, value, isTimeout = false, expireTime = 1000 * 60 * 60 * 24) => {
      try {
        // 如果开启过期，默认过期时间为一天 1000 * 60 * 60 * 24，时间单位为毫秒
        const localObj = {
          now: +new Date(),
          expire: isTimeout ? expireTime : 0,
          data: value
        };
        __local__.setItem(key, JSON.stringify(localObj));
        return cache.local
      } catch (e) {
        return cache.local
      }
    },
    get: key => {
      try {
        const value = __local__.getItem(key);
        let localData = null;
        let data = null;
        // 是否存在key对应的localstorage值
        if (value) {
          localData = JSON.parse(value);
        }
        // 是否存在data属性，有为新的数据格式
        if (localData && localData.data) {
          // 数据是否过期
          const diff =
            localData.expire > 0 &&
            +new Date() - localData.now * 1 > localData.expire;
          // 过期，删除数据
          if (diff) {
            cache.local.remove(key);
          } else {
            data = localData.data;
          }
        } else {
          data = localData;
        }
        return data
      } catch (e) {
        return null
      }
    },
    remove: key => {
      try {
        __local__.removeItem(key);
        return cache.local
      } catch (e) {
        return cache.local
      }
    },
    clear: () => {
      try {
        __local__.clear();
        return cache.local
      } catch (e) {
        return cache.local
      }
    }
  }
};

/**
 * @fileOverview 数组相关处理函数
 * @module Array
 */

/**
 * @description 是否是类数组对象
 * @param {*} obj
 * @returns
 */
const isArrayLike = obj =>
  obj != null && typeof obj[Symbol.iterator] === 'function';

/**
 * @fileOverview 浏览器相关处理函数
 * @module Bom
 */

/**
 * @description 判断是否是iphoneX系列机型，现在 iPhone 在 iPhone X 之后的机型都需要适配，所以可以对 X 以后的机型统一处理，我们可以认为这系列手机的特征是 ios + 长脸
 * @returns {Boolean}
 */
const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    )
  }
  return false
};

/**
 * @description 判断浏览器是否支持webp文件格式
 * @returns {Boolean}
 */
const isSupportWebp = () => {
  if (cache.local.get('support_webp') !== null) {
    return cache.local.get('support_webp')
  } else {
    const isSupport =
      !![].map &&
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;
    cache.local.set('support_webp', isSupport);
    return isSupport
  }
};

/**
 * @description 获取环境信息
 * @returns {string}
 */
const getEnv = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (!/mobile|android/.test(ua)) {
    return 'pc'
  } else {
    if (/micromessenger(\/[\d]+)*/.test(ua)) {
      return 'weixin'
    } else if (/qq\/(\/[\d]+)*/.test(ua) || /qzone\//.test(ua)) {
      return 'qq'
    } else {
      return 'h5'
    }
  }
};

/**
 * @description 获取设备类型
 * @returns {string}
 */
const getDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('iphone') !== -1) {
    return 'iphone'
  } else if (ua.indexOf('ipad') !== -1) {
    return 'ipad'
  } else if (ua.indexOf('android') !== -1) {
    return 'android'
  }
  return ''
};

/**
 * @fileOverview 函数式编程相关函数
 * @module Functional
 */

/**
 * @description 组合函数
 * @param {*}
 * @returns
 */
const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

/**
 * @description 科里化
 * @param {*}
 * @returns
 */
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

/**
 * @description 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 interval 毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
const throttle = (fn, interval = 300) => {
  let canRun = true;
  return function () {
    if (!canRun) return
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  }
};

/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
const debounce = (fn, interval = 300) => {
  let timeout = null;
  return function () {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  }
};

/**
 * @fileOverview axiox-jsonp
 * @module axios
 */

let cid = 1;

function buildParams (params) {
  const result = [];

  for (const i in params) {
    result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
  }

  return result.join('&')
}

function jsonpAdapter (config) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    let src = config.url;

    if (config.params) {
      const params = buildParams(config.params);

      if (params) {
        src += (src.indexOf('?') >= 0 ? '&' : '?') + params;
      }
    }

    script.async = true;

    const jsonp = 'axiosJsonpCallback' + cid++;
    const old = window[jsonp];
    let isAbort = false;

    window[jsonp] = function (responseData) {
      window[jsonp] = old;

      if (isAbort) {
        return
      }

      const response = {
        data: responseData,
        status: 200
      };

      resolve(response);
    };

    const additionalParams = {
      _: new Date().getTime()
    };

    additionalParams[config.callbackParamName || 'callback'] = jsonp;

    src += (src.indexOf('?') >= 0 ? '&' : '?') + buildParams(additionalParams);

    script.onload = script.onreadystatechange = function () {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;

        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        script = null;
      }
    };

    script.onerror = function (err) {
      script.onerror = null;

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      reject(err);
    };

    if (config.cancelToken) {
      config.cancelToken.promise.then(function (cancel) {
        if (!script) {
          return
        }

        isAbort = true;
        reject(cancel);
      });
    }

    script.src = src;

    document.head.appendChild(script);
  })
}

exports.add = add;
exports.addClass = addClass;
exports.bottomVisible = bottomVisible;
exports.cache = cache;
exports.compose = compose;
exports.copy = copy;
exports.curry = curry;
exports.debounce = debounce;
exports.deepCopy = deepCopy;
exports.delCookie = delCookie;
exports.divide = divide;
exports.elementIsVisibleInViewport = elementIsVisibleInViewport;
exports.formatDate = formatDate;
exports.formatNum = formatNum;
exports.gcd = gcd;
exports.getCookie = getCookie;
exports.getDevice = getDevice;
exports.getEnv = getEnv;
exports.getGbLen = getGbLen;
exports.getHash = getHash;
exports.getKeyByVal = getKeyByVal;
exports.getQuery = getQuery;
exports.getType = getType;
exports.getValByVal = getValByVal;
exports.hasClass = hasClass;
exports.isArrayLike = isArrayLike;
exports.isIphoneX = isIphoneX;
exports.isSupportWebp = isSupportWebp;
exports.jsonpAdapter = jsonpAdapter;
exports.listToHash = listToHash;
exports.listener = listener;
exports.lockMaskScroll = lockMaskScroll;
exports.mixParams = mixParams;
exports.multiply = multiply;
exports.objectToObjArray = objectToObjArray;
exports.off = off;
exports.on = on;
exports.pick = pick;
exports.removeClass = removeClass;
exports.scm = scm;
exports.scrollTo = scrollTo;
exports.scrollToTop = scrollToTop;
exports.setCookie = setCookie;
exports.subGbString = subGbString;
exports.subtract = subtract;
exports.throttle = throttle;
exports.toFixed = toFixed;
exports.trimAll = trimAll;
exports.trimLandR = trimLandR;
exports.trimLeft = trimLeft;
exports.trimRight = trimRight;
