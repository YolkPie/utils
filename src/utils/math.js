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
export function formatNum (num, char, pre = '') {
  if (
    (typeof num !== 'number' && typeof num !== 'string') ||
    char === undefined || char === null
  ) {
    return num
  }
  let res = ''
  const _strList = num.toString().split('.')
  let decimal = _strList[1]
  decimal = decimal || ''
  const formatStr = _strList[0]
    .replace(/(?!^)(?=(\d{3})+$)/g, char)
    .replace(/^/, pre)
  res = decimal ? formatStr + '.' + decimal : formatStr
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
export function toFixed (num, len, type = '') {
  if ((typeof num !== 'number' && typeof num !== 'string') || len < 0) {
    return num
  }
  const numList = num.toString().split('.')
  const decimal = numList[1]
  const _len = decimal ? decimal.length : 0
  if (_len <= len) {
    return num.toFixed(len)
  } else {
    let res, nextBit
    const initNum =
      numList[0] + '' + decimal.substr(0, len) + '.' + decimal.substr(len)
    switch (type) {
      case 'ceil':
        res = Math.ceil(initNum) / Math.pow(10, len)
        break
      case 'floor':
        res = Math.floor(initNum) / Math.pow(10, len)
        break
      case 'round':
        nextBit = decimal[len]
        if (+nextBit >= 5) {
          res = Math.ceil(initNum) / Math.pow(10, len)
        } else {
          res = Math.floor(initNum) / Math.pow(10, len)
        }
        break
      default:
        res = num
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
export function gcd (num1, num2) {
  let temp = 0
  while (num2 !== 0) {
    temp = num1 % num2
    num1 = num2
    num2 = temp
  }
  return num1
}

/**
 * @description 最小公倍数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最小公倍数
 */
export function scm (num1, num2) {
  return (num1 * num2) / gcd(num1, num2)
}
