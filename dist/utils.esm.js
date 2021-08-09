/**
 * @description 获取类型
 * @param {*} value 要获取类型的值
 * @returns {*|string} 数据类型：如 String, Number, Object, Array, Null, Date, Symbol
 */
function getType(value) {
    var o = {};
    var type = o.toString.call(value);
    var typeArr = /^\[object (\w+)\]$/.exec(type);
    return typeArr ? typeArr[1] : '';
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
function getCookie(key) {
    var cookie = document.cookie;
    if (!key)
        return cookie;
    var cookies = cookie.split('; ');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var item = cookies_1[_i];
        var cookieArr = /^([^=]+)=([^=]+)$/.exec(item);
        if (cookieArr && cookieArr[1] === key) {
            return unescape(cookieArr[2]);
        }
    }
    return '';
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
function setCookie(key, value, expires) {
    if (!key || !value)
        return;
    var getExpires = function (time) {
        var type = getType(time);
        var expiresStr = ';expires=';
        if (['Date', 'Number'].includes(type)) {
            expiresStr += new Date(time).toUTCString();
        }
        else if (type === 'String') {
            // 支持传入'd30', 'h12', 'm20'
            var timeType = /^(d|h|m)(\d+)$/.exec(time);
            if (!timeType)
                return '';
            var date = new Date();
            switch (timeType[1]) {
                case 'd':
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * +timeType[2]);
                    break;
                case 'h':
                    date.setTime(date.getTime() + 3600 * 1000 * +timeType[2]);
                    break;
                default:
                    date.setTime(date.getTime() + 60 * 1000 * +timeType[2]);
            }
            expiresStr += date.toUTCString();
        }
        else {
            expiresStr = '';
        }
        return expiresStr;
    };
    var expiresTime = expires ? getExpires(expires) : '';
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
function delCookie(key) {
    if (!key)
        return;
    var currentCookie = getCookie(key);
    var date = new Date();
    var expiresTime = date.setTime(date.getTime() - 86400000);
    var expiresStr = ';expires=' + new Date(expiresTime).toUTCString();
    document.cookie = key + '=' + escape(currentCookie) + expiresStr;
}

/**
 * @description 自定义返回值的替换函数
 * @author yujihu
 * @param {Function} fn 自定义替换值的函数，会以匹配到的字符串为参数调用该函数
 * @returns {Function} 返回一个供正则匹配替换使用函数，
 */
function replaceByMath(fn) {
    return function (match, str) {
        if (!str)
            return match;
        return fn(str);
    };
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
function formatDate(date, format) {
    if (format === void 0) { format = 'YYYY-MM-DD'; }
    var _date = new Date(date);
    var year = _date.getFullYear();
    var month = _date.getMonth() + 1;
    var day = _date.getDate();
    var week = _date.getDay();
    var hour = _date.getHours();
    var min = _date.getMinutes();
    var sec = _date.getSeconds();
    var upWeek = ['日', '一', '二', '三', '四', '五', '六'];
    // 两位数补全
    var getReal = function (number) {
        var full = number > 9 ? number + '' : '0' + number;
        return replaceByMath(function (str) {
            return str.length === 2 ? full : number + '';
        });
    };
    var res = format
        .replace(/([Y]+)/g, replaceByMath(function (str) {
        return str.length === 4 ? year + '' : (year + '').slice(2);
    }))
        .replace(/([W]+)/g, replaceByMath(function (str) {
        return str.length === 2 ? upWeek[week] : week + '';
    }))
        .replace(/([M]+)/g, getReal(month))
        .replace(/([D]+)/g, getReal(day))
        .replace(/([h]+)/g, getReal(hour))
        .replace(/([m]+)/g, getReal(min))
        .replace(/([s]+)/g, getReal(sec));
    return res;
}

function getDecimalLen(value) {
    if (typeof value !== 'number' && typeof value !== 'string') {
        throw new Error('参数类型错误');
    }
    var _len = value.toString().split('.')[1]
        ? value.toString().split('.')[1].length
        : 0;
    return _len;
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
function add(arg1, arg2) {
    var _len1, _len2;
    try {
        _len1 = getDecimalLen(arg1);
        _len2 = getDecimalLen(arg2);
        var maxLen = Math.max(_len1, _len2);
        var mi = Math.pow(10, maxLen);
        var res = ((arg1 * mi + arg2 * mi) / mi).toFixed(maxLen);
        return +res;
    }
    catch (e) {
        return NaN;
    }
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
function subtract(arg1, arg2) {
    return add(arg1, -arg2);
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
function multiply(arg1, arg2) {
    var _len1, _len2;
    var _arg1 = arg1.toString();
    var _arg2 = arg2.toString();
    try {
        _len1 = getDecimalLen(_arg1);
        _len2 = getDecimalLen(_arg2);
        var maxLen = _len1 + _len2;
        var res = (parseInt(_arg1.replace('.', ''), 10) * parseInt(_arg2.replace('.', ''), 10)) / Math.pow(10, maxLen);
        return +res;
    }
    catch (e) {
        return NaN;
    }
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
function divide(arg1, arg2) {
    var _len1, _len2;
    var _arg1 = arg1.toString();
    var _arg2 = arg2.toString();
    try {
        _len1 = getDecimalLen(_arg1);
        _len2 = getDecimalLen(_arg2);
        var m = _len2 - _len1;
        var res = (parseInt(_arg1.replace('.', ''), 10) / parseInt(_arg2.replace('.', ''), 10)) * Math.pow(10, m);
        return +res;
    }
    catch (e) {
        return NaN;
    }
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
function trimLeft(str, char) {
    if (char === void 0) { char = ' '; }
    try {
        var regExp = new RegExp(char + '*');
        return str.replace(regExp, '');
    }
    catch (e) {
        return '';
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
function trimRight(str, char) {
    if (char === void 0) { char = ' '; }
    try {
        var regExp = new RegExp(char + '*$');
        return str.replace(regExp, '');
    }
    catch (e) {
        return '';
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
function trimAll(str, char) {
    if (char === void 0) { char = ' '; }
    try {
        var regExp = new RegExp(char + '*', 'g');
        return str.replace(regExp, '');
    }
    catch (e) {
        return '';
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
function trimLandR(str, char) {
    if (char === void 0) { char = ' '; }
    try {
        var regExp = new RegExp('^' + char + '*|' + char + '*$', 'g');
        return str.replace(regExp, '');
    }
    catch (e) {
        // console.log(e)
    }
}
/**
 * @description 判断字符长度，区分中英文
 * @param {String} str - 字符串
 * @returns {Number} - 返回字符长度
 */
function getGbLen(str) {
    var len = 0;
    var content = str || '';
    for (var i = 0; i < content.length; i++) {
        if (content.charCodeAt(i) > 127 || content.charCodeAt(i) === 94) {
            len += 2;
        }
        else {
            len++;
        }
    }
    return len;
}
/**
 * @description 截取字符，区分中英文
 * @param {String} str - 字符串
 * @param {Number} len - 字符串截取长度
 * @returns {String} - 返回截取后字符
 */
function subGbString(str, len) {
    // eslint-disable-next-line
    var regexp = /[^\x00-\xff]/g; // 正则表达式匹配中文
    // 当字符串字节长度小于指定的字节长度时
    if (str.replace(regexp, 'aa').length <= len) {
        return str;
    }
    // 假设指定长度内都是中文
    var m = Math.floor(len / 2);
    for (var i = m, j = str.length; i < j; i++) {
        // 当截取字符串字节长度满足指定的字节长度
        if (str.substring(0, i).replace(regexp, 'aa').length >= len) {
            return str.substring(0, i);
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
function hasClass(target, className) {
    if (target.classList) {
        return target.classList.contains(className);
    }
    else {
        var dom = (getType(target) === 'String' ? document.querySelector(target) : target);
        if (!dom)
            return false;
        return (" " + dom.className + " ").indexOf(" " + className + " ") > -1;
    }
}
/**
 * @description 添加class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要添加的类名
 * @returns {*} none
 */
function addClass(target, className) {
    if (!target || !className)
        return;
    if (!hasClass(target, className)) {
        if (target.classList) {
            target.classList.add(className);
        }
        else {
            var dom = (getType(target) === 'String' ? document.querySelector(target) : target);
            if (!dom)
                return;
            var currentCls = dom.className;
            dom.className = currentCls + " " + className;
        }
    }
}
/**
 * @description 移除class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要移除的类名
 * @returns {*} none
 */
function removeClass(target, className) {
    if (!target || !className)
        return;
    if (hasClass(target, className)) {
        if (target.classList) {
            target.classList.remove(className);
        }
        else {
            var dom = (getType(target) === 'String' ? document.querySelector(target) : target);
            /* istanbul ignore next */
            if (!dom)
                return;
            var currentCls = dom.className;
            var clsArr = currentCls.split(' ');
            var resArr = clsArr.filter(function (item) { return item !== className; });
            dom.className = resArr.join(' ');
        }
    }
}
/**
 * @description 是否到达页面底部
 * @param {number} [offset=0] 距离页面底部的偏移
 * @returns
 */
var bottomVisible = function (offset) {
    if (offset === void 0) { offset = 0; }
    return Math.ceil(document.documentElement.clientHeight + window.scrollY) + offset >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
};
/**
 * @description 判断元素是否在可视范围内
 * @param {*} el 页面元素
 * @param {boolean} [partiallyVisible=false] 是否为部分可见
 * @returns
 */
function elementIsVisibleInViewport(el, partiallyVisible) {
    if (partiallyVisible === void 0) { partiallyVisible = false; }
    var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    return partiallyVisible
        ? ((top > 0 && top < window.innerHeight) ||
            (bottom > 0 && bottom < window.innerHeight)) &&
            ((left > 0 && left < window.innerWidth) || (right > 0 && right < window.innerWidth))
        : top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth;
}
/**
 * @description 复制文本
 * @param {*} str
 */
function copy(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.top = '-9999px';
    document.body.appendChild(el);
    var getSelection = document.getSelection();
    var selected = getSelection && getSelection.rangeCount > 0 ? getSelection.getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (getSelection && selected) {
        getSelection.removeAllRanges();
        getSelection.addRange(selected);
    }
}
/**
 * @description 返回页面顶部动画
 */
function scrollToTop() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var requestId;
    requestId = window.requestAnimationFrame(function fn() {
        if (scrollTop > 0) {
            requestId = window.requestAnimationFrame(fn);
            window.scrollTo(0, scrollTop - scrollTop / 8);
        }
        else {
            if (requestId) {
                window.cancelAnimationFrame(requestId);
            }
        }
    });
    if (scrollTop > 0) {
        requestId = window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
    }
    else {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
        }
    }
}
/**
 * @description 滚动到页面指定位置
 * @param scrollTop
 */
var scrollTo = function (scrollTop) {
    var topTimer = null;
    if (topTimer) {
        window.cancelAnimationFrame(topTimer);
    }
    topTimer = window.requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > scrollTop) {
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop =
                    oTop - Math.floor((oTop - scrollTop) / 3);
                topTimer = window.requestAnimationFrame(fn);
                (function (oldTop) {
                    if (Math.abs(oldTop - oTop) <= 2) {
                        window.cancelAnimationFrame(topTimer);
                    }
                })(document.documentElement.scrollTop || document.body.scrollTop);
            }
            else {
                window.cancelAnimationFrame(topTimer);
            }
        }
        else if (oTop < scrollTop) {
            document.body.scrollTop = document.documentElement.scrollTop =
                oTop + Math.ceil((scrollTop - oTop) / 3);
            topTimer = window.requestAnimationFrame(fn);
            (function (oldTop) {
                if (Math.abs(oldTop - oTop) <= 2) {
                    window.cancelAnimationFrame(topTimer);
                }
            })(document.documentElement.scrollTop || document.body.scrollTop);
        }
        else {
            window.cancelAnimationFrame(topTimer);
        }
    });
};
/**
 * @description: 禁止页面滚动/允许页面滚动 需要为body添加fixed样式
 * @param {type}
 * @returns
 */
var lockMaskScroll = (function (bodyCls) {
    var scrollTop;
    var lockedCount = 0;
    return {
        afterOpen: function () {
            lockedCount++;
            if (document.body.classList.contains(bodyCls))
                return;
            scrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.body.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function () {
            if (--lockedCount > 0)
                return;
            if (document.body.classList.contains(bodyCls)) {
                document.body.classList.remove(bodyCls);
                if (document.scrollingElement) {
                    document.scrollingElement.scrollTop = scrollTop;
                }
            }
        }
    };
})('dialog-open');
/**
 * @description 找到某个元素最近的包含指定选择器的父级元素
 * @param {*} el 元素
 * @param {*} selector 选择器
 * @returns 父级元素
 */
var closest = function (el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        else {
            el = el.parentElement;
        }
    }
    return null;
};

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
function formatNum(num, char, pre) {
    if (pre === void 0) { pre = ''; }
    if ((typeof num !== 'number' && typeof num !== 'string') ||
        char === undefined || char === null) {
        return num;
    }
    var res = '';
    var _strList = num.toString().split('.');
    var decimal = _strList[1];
    decimal = decimal || '';
    var formatStr = _strList[0]
        .replace(/(?!^)(?=(\d{3})+$)/g, char)
        .replace(/^/, pre);
    res = decimal ? formatStr + '.' + decimal : formatStr;
    return res;
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
function toFixed(num, len, type) {
    if (type === void 0) { type = ''; }
    if ((typeof num !== 'number' && typeof num !== 'string') || len < 0) {
        return num;
    }
    var numList = num.toString().split('.');
    var decimal = numList[1];
    var _len = decimal ? decimal.length : 0;
    if (_len <= len) {
        return parseInt("" + num, 10).toFixed(len);
    }
    else {
        var res = void 0, nextBit = void 0;
        var initNum = parseInt(numList[0] + '' + decimal.substr(0, len) + '.' + decimal.substr(len), 10);
        switch (type) {
            case 'ceil':
                res = Math.ceil(initNum) / Math.pow(10, len);
                break;
            case 'floor':
                res = Math.floor(initNum) / Math.pow(10, len);
                break;
            case 'round':
                nextBit = decimal[len];
                if (+nextBit >= 5) {
                    res = Math.ceil(initNum) / Math.pow(10, len);
                }
                else {
                    res = Math.floor(initNum) / Math.pow(10, len);
                }
                break;
            default:
                res = num;
        }
        return res.toString();
    }
}
/**
 * @description 最大公约数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最大公约数
 */
function gcd(num1, num2) {
    var temp = 0;
    while (num2 !== 0) {
        temp = num1 % num2;
        num1 = num2;
        num2 = temp;
    }
    return num1;
}
/**
 * @description 最小公倍数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最小公倍数
 */
function scm(num1, num2) {
    return (num1 * num2) / gcd(num1, num2);
}

function getKeyByVal(val, obj) {
    if (getType(obj) !== 'Object') {
        /* istanbul ignore next */
        return '';
    }
    var keys = Object.keys(obj);
    var res = '';
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var i = keys_1[_i];
        if (obj[i] === val) {
            res = i;
            break;
        }
    }
    return res;
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
function getValByVal(val, list, field) {
    var defaultField = { key: 'key', value: 'value' };
    var fields = Object.assign({}, defaultField, field);
    try {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item[fields.value] === val) {
                return item[fields.key];
            }
        }
    }
    catch (e) {
        return null;
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
function pick(obj, props) {
    if (getType(obj) !== 'Object' && getType(props) !== 'Array') {
        /* istanbul ignore next */
        return;
    }
    var res = {};
    props.forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = obj[key];
        }
    });
    return res;
}
/**
 * @description 将对象转换为对象数组，数组项中内容为原有的键及值，对应的key由参数决定
 * @param {Object} obj 待转换对象
 * @param {String} keyConvert 对象key值转换为对象数组后，值对应的key
 * @param {String} valueConvert 对象value值转换为对象数组后，值对应的key
 * @returns {Array} 返回对象数组
 */
function objectToObjArray(obj, keyConvert, valueConvert) {
    if (getType(obj) !== 'Object' ||
        getType(keyConvert) !== 'String' ||
        getType(valueConvert) !== 'String') {
        console.warn('参数格式错误！');
        return [];
    }
    return Object.entries(obj).map(function (item) {
        var obj = {};
        obj[keyConvert] = item[0];
        obj[valueConvert] = item[1];
        return obj;
    });
}
/**
 * @description 深拷贝
 * @param {*} val 待转换值
 * @returns {*} 返回值
 */
function deepCopy(val) {
    var type = getType(val);
    if (type !== 'Object' && type !== 'Array') {
        return val;
    }
    var result = type === 'Array' ? [] : {};
    for (var i in val) {
        if (Object.prototype.hasOwnProperty.call(val, i)) {
            if (val[i] &&
                (getType(val[i]) === 'Object' || getType(val[i]) === 'Array')) {
                result[i] = deepCopy(val[i]);
            }
            else {
                result[i] = val[i];
            }
        }
    }
    return result;
}
/**
 * @description 混合为真实请求的参数
 * @param {Object} params 接口参数
 * @param {Object} paramsMap 参数映射 - e.g {businessType: 'bussinessType', type: 'tabType'}
 * @returns {Object} 真实请求的对象 - e.g {bussinessType: 0, tabType: 2}
 * @example
 * mixParams({status: 0, type: 2}, {type: 'businessType', status: 'status'}) //=> {businessType: 2, status: 0}
 */
function mixParams(params, paramsMap) {
    var keys = Object.keys(params);
    if (!keys.length)
        return params;
    return keys.reduce(function (pre, item) {
        var key = paramsMap[item] || item;
        pre[key] = params[item];
        return pre;
    }, {});
}
/**
 * @description 将复杂数组根据某个键值转化为对象
 * @param {Array} list 数组
 * @param {String} key 键值名称
 * @returns {Object} 转化后的对象
 * @example
 * listToHash([{label: '审核通过', value: 1}, {label: '驳回', value: -1}], 'value')
 */
function listToHash(list, key) {
    return list.reduce(function (pre, item) {
        var objKey = item[key];
        if (objKey !== undefined) {
            pre[objKey] = item;
        }
        return pre;
    }, {});
}

/**
 * @description 获取url查询内容
 * @param {string} name - 要获取的查询字段
 * @returns {*} 如果传入name则返回它的值，不传则返回query组合对象
 */
function getQuery(name) {
    var search = window.location.search.slice(1);
    if (!search) {
        search = window.location.href.split('?')[1];
    }
    if (!search)
        return '';
    var querys = search.split('&');
    var res = querys.reduce(function (pre, current) {
        var currentArr = current.split('=');
        pre[currentArr[0]] = decodeURIComponent(currentArr[1]);
        return pre;
    }, {});
    return name ? res[name] : res;
}
/**
 * @description 获取url锚点
 * @returns {string} 返回最后面一个#后的值，没有时返回空字符串
 */
function getHash() {
    var hash = window.location.hash;
    if (!hash)
        return '';
    var resArr = /#([^#]+)$/.exec(hash);
    return resArr ? resArr[1] : '';
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
function listener(el, event, cb) {
    if (el.addEventListener) {
        el.addEventListener(event, cb, false);
        return {
            remove: function () {
                el.removeEventListener(event, cb, false);
            }
        };
    }
    else if (el.attachEvent) {
        el.attachEvent('on' + event, cb);
        return {
            remove: function () {
                el.detachEvent('on' + event, cb);
            }
        };
    }
}
/**
 * @description 绑定事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
var on = (function () {
    // @ts-ignore
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    }
    else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
/**
 * @description 解绑事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
var off = (function () {
    // @ts-ignore
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    }
    else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

/**
 * @fileOverview 本地存储处理操作封装
 * @module cache
 */
var __session__ = window.sessionStorage;
var __local__ = window.localStorage;
var TYPES = ['session', 'local'];
var DEFAULT_CACHE = TYPES[0];
var cache = {
    set: function (key, value, type) {
        if (type === void 0) { type = DEFAULT_CACHE; }
        try {
            !(type in TYPES) && (type = DEFAULT_CACHE);
            cache[type].set(key, value);
            return cache[type];
        }
        catch (e) {
            return cache[type];
        }
    },
    get: function (key, type) {
        if (type === void 0) { type = DEFAULT_CACHE; }
        try {
            !(type in TYPES) && (type = DEFAULT_CACHE);
            return cache[type].get(key);
        }
        catch (e) {
            return null;
        }
    },
    clear: function (type) {
        if (type === void 0) { type = DEFAULT_CACHE; }
        try {
            !(type in TYPES) && (type = DEFAULT_CACHE);
            cache[type].clear();
            return cache[type];
        }
        catch (e) {
            return cache[type];
        }
    },
    remove: function (key, type) {
        if (type === void 0) { type = DEFAULT_CACHE; }
        try {
            cache[type].remove(key);
            return cache;
        }
        catch (e) {
            return cache;
        }
    },
    session: {
        set: function (key, value) {
            try {
                __session__.setItem(key, JSON.stringify(value));
                return cache.session;
            }
            catch (e) {
                return cache.session;
            }
        },
        get: function (key) {
            try {
                var value = __session__.getItem(key);
                return key && JSON.parse(value);
            }
            catch (e) {
                return null;
            }
        },
        remove: function (key) {
            try {
                __session__.removeItem(key);
                return cache.session;
            }
            catch (e) {
                return cache.session;
            }
        },
        clear: function () {
            try {
                __session__.clear();
                return cache.session;
            }
            catch (e) {
                return cache.session;
            }
        }
    },
    local: {
        set: function (key, value, isTimeout, expireTime) {
            if (isTimeout === void 0) { isTimeout = false; }
            if (expireTime === void 0) { expireTime = 1000 * 60 * 60 * 24; }
            try {
                // 如果开启过期，默认过期时间为一天 1000 * 60 * 60 * 24，时间单位为毫秒
                var localObj = {
                    now: +new Date(),
                    expire: isTimeout ? expireTime : 0,
                    data: value
                };
                __local__.setItem(key, JSON.stringify(localObj));
                return cache.local;
            }
            catch (e) {
                return cache.local;
            }
        },
        get: function (key) {
            try {
                var value = __local__.getItem(key);
                var localData = null;
                var data = null;
                // 是否存在key对应的localstorage值
                if (value) {
                    localData = JSON.parse(value);
                }
                // 是否存在data属性，有为新的数据格式
                if (localData && localData.data) {
                    // 数据是否过期
                    var diff = localData.expire > 0 &&
                        +new Date() - localData.now * 1 > localData.expire;
                    // 过期，删除数据
                    if (diff) {
                        cache.local.remove(key);
                    }
                    else {
                        data = localData.data;
                    }
                }
                else {
                    data = localData;
                }
                return data;
            }
            catch (e) {
                return null;
            }
        },
        remove: function (key) {
            try {
                __local__.removeItem(key);
                return cache.local;
            }
            catch (e) {
                return cache.local;
            }
        },
        clear: function () {
            try {
                __local__.clear();
                return cache.local;
            }
            catch (e) {
                return cache.local;
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
var isArrayLike = function (obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
};

/**
 * @fileOverview 浏览器相关处理函数
 * @module Bom
 */
/**
 * @description 判断是否是iphoneX系列机型，现在 iPhone 在 iPhone X 之后的机型都需要适配，所以可以对 X 以后的机型统一处理，我们可以认为这系列手机的特征是 ios + 长脸
 * @returns {Boolean}
 */
var isIphoneX = function () {
    if (typeof window !== 'undefined' && window) {
        return (/iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812);
    }
    return false;
};
/**
 * @description 判断浏览器是否支持webp文件格式
 * @returns {Boolean}
 */
var isSupportWebp = function () {
    if (cache.local.get('support_webp') !== null) {
        return cache.local.get('support_webp');
    }
    else {
        var isSupport = !![].map &&
            document
                .createElement('canvas')
                .toDataURL('image/webp')
                .indexOf('data:image/webp') === 0;
        cache.local.set('support_webp', isSupport);
        return isSupport;
    }
};
/**
 * @description 获取环境信息
 * @returns {string}
 */
var getEnv = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (!/mobile|android/.test(ua)) {
        return 'pc';
    }
    else {
        if (/micromessenger(\/[\d]+)*/.test(ua)) {
            return 'weixin';
        }
        else if (/qq\/(\/[\d]+)*/.test(ua) || /qzone\//.test(ua)) {
            return 'qq';
        }
        else {
            return 'h5';
        }
    }
};
/**
 * @description 获取设备类型
 * @returns {string}
 */
var getDevice = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('iphone') !== -1) {
        return 'iphone';
    }
    else if (ua.indexOf('ipad') !== -1) {
        return 'ipad';
    }
    else if (ua.indexOf('android') !== -1) {
        return 'android';
    }
    return '';
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/**
 * @fileOverview 函数式编程相关函数
 * @module Functional
 */
/**
 * @description 组合函数
 * @param {*}
 * @returns
 */
var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (f, g) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return f(g.apply(void 0, args));
    }; });
};
/**
 * @description 科里化
 * @param {*}
 * @returns
 */
var curry = function (fn, arity) {
    if (arity === void 0) { arity = fn.length; }
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return arity <= args.length ? fn.apply(void 0, args) : curry.bind.apply(curry, __spreadArray([null, fn, arity], args));
};

var throttle = function (fn, interval) {
    if (interval === void 0) { interval = 300; }
    var canRun = true;
    return function () {
        var _this = this;
        if (!canRun)
            return;
        canRun = false;
        setTimeout(function () {
            // @ts-ignore
            fn.apply(_this, arguments);
            canRun = true;
        }, interval);
    };
};
/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
var debounce = function (fn, interval) {
    if (interval === void 0) { interval = 300; }
    var timeout = null;
    return function () {
        var _this = this;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function () {
            // @ts-ignore
            fn.apply(_this, arguments);
        }, interval);
    };
};
/**
 * @description 处理图片加载失败
 */
var handleImgError = function (errImgUrl) {
    window.addEventListener('error', function (e) {
        var target = e.target; // 当前dom节点
        if (!target) {
            return;
        }
        var tagName = target.tagName;
        var count = Number(target.dataset.errcount) || 0; // 以失败的次数，默认为0
        var max = 3; // 总失败次数，此时设定为3
        // 当前异常是由图片加载异常引起的
        if (tagName.toUpperCase() === 'IMG') {
            if (count >= max) {
                target.src =
                    'data:image/png;base64,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';
            }
            else {
                target.dataset.errcount = count + 1;
                target.src = errImgUrl || '//img14.360buyimg.com/imagetools/jfs/t1/101354/29/1631/2736/5dc26a29E38d15fe9/17a1d33c799d2dd4.png';
            }
        }
    }, true);
};

/**
 * @fileOverview axiox-jsonp
 * @module axios
 */
/* tslint:disable */
var cid = 1;
function buildParams(params) {
    var result = [];
    for (var i in params) {
        result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
    }
    return result.join('&');
}
function jsonpAdapter(config) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        var src = config.url;
        if (!/^([a-z][a-z\d\\+\-\\.]*:)?\/\//i.test(src)) {
            src = config.baseURL + src;
        }
        if (config.params) {
            var params = buildParams(config.params);
            if (params) {
                src += (src.indexOf('?') >= 0 ? '&' : '?') + params;
            }
        }
        script.async = true;
        var jsonp = 'axiosJsonpCallback' + cid++;
        // const
        var win = window;
        var old = win[jsonp];
        var isAbort = false;
        win[jsonp] = function (responseData) {
            win[jsonp] = old;
            if (isAbort) {
                return;
            }
            var response = {
                data: responseData,
                status: 200
            };
            resolve(response);
        };
        var additionalParams = {
            _: new Date().getTime()
        };
        // @ts-ignore
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
                    return;
                }
                isAbort = true;
                reject(cancel);
            });
        }
        script.src = src;
        document.head.appendChild(script);
    });
}

/**
 * @fileOverview 移动端适配
 * @module rem
 */
var rem = (function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function recalc(designWidth) {
        designWidth = designWidth || 750;
        var clientWidth = docEl.clientWidth || window.screen.width;
        if (!clientWidth)
            return;
        docEl.style.fontSize = (100 * clientWidth) / designWidth + 'px';
    }
    return function (designWidth) {
        recalc(designWidth);
        win.addEventListener && win.addEventListener(resizeEvt, function () {
            recalc(designWidth);
        }, false);
    };
})(document, window);

/**
 * 修复Mask组件touch事件穿透
 * 需要滚动的地方请加class: 'pm-scroller'
 * 参考代码:
 * http://www.zhangxinxu.com/study/201612/mobile-scroll-prevent-window-scroll.html
 * 需添加样式：
 * .mask-open {
 *   overflow: hidden;
 * }
 */
function fixMask() {
    var data = {
        scroller: null,
        posY: 0,
        scrollY: 0,
        maxscroll: 0
    };
    function isIosModalVisible() {
        return /iPhone|iPod|iPad/i.test(navigator.userAgent) && document.body.className.indexOf('mask-open') > -1;
    }
    document.body.addEventListener('touchstart', function (e) {
        if (!isIosModalVisible())
            return;
        var scroller = closest(e.target, '.pm-scroller');
        if (!scroller)
            return;
        data.scroller = scroller;
        // 垂直位置标记
        data.posY = e.touches[0].pageY;
        data.scrollY = scroller.scrollTop;
        // 是否可以滚动
        data.maxscroll = scroller.scrollHeight - scroller.clientHeight;
    }, { passive: false });
    document.body.addEventListener('touchmove', function (e) {
        if (!isIosModalVisible())
            return;
        if (!data.scroller) {
            e.preventDefault();
            return;
        }
        // @ts-ignore
        var scrollTop = data.scroller.scrollTop;
        var distanceY = e.touches[0].pageY - data.posY;
        // 上下边缘检测
        if (distanceY > 0 && scrollTop === 0) {
            // 往上滑，并且到头
            // 禁止滚动的默认行为
            e.preventDefault();
            return;
        }
        // 下边缘检测
        if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
            // 往下滑，并且到头
            // 禁止滚动的默认行为
            e.preventDefault();
        }
    }, { passive: false });
    document.body.addEventListener('touchend', function () {
        if (!isIosModalVisible())
            return;
        data.scroller = null;
        data.maxscroll = 0;
    }, { passive: false });
}

export { add, addClass, bottomVisible, cache, closest, compose, copy, curry, debounce, deepCopy, delCookie, divide, elementIsVisibleInViewport, fixMask, formatDate, formatNum, gcd, getCookie, getDevice, getEnv, getGbLen, getHash, getKeyByVal, getQuery, getType, getValByVal, handleImgError, hasClass, isArrayLike, isIphoneX, isSupportWebp, jsonpAdapter, listToHash, listener, lockMaskScroll, mixParams, multiply, objectToObjArray, off, on, pick, rem, removeClass, scm, scrollTo, scrollToTop, setCookie, subGbString, subtract, throttle, toFixed, trimAll, trimLandR, trimLeft, trimRight };
