import { getDecimalLen } from '../depend/getDecimalLen'

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
export function add (arg1, arg2) {
  let _len1, _len2
  try {
    _len1 = getDecimalLen(arg1)
    _len2 = getDecimalLen(arg2)
  } catch (e) {
    // console.log(e)
  }
  const maxLen = Math.max(_len1, _len2)
  const mi = Math.pow(10, maxLen)
  const res = ((arg1 * mi + arg2 * mi) / mi).toFixed(maxLen)
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
export function subtract (arg1, arg2) {
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
export function multiply (arg1, arg2) {
  let _len1, _len2
  const _arg1 = arg1.toString()
  const _arg2 = arg2.toString()
  try {
    _len1 = getDecimalLen(_arg1)
    _len2 = getDecimalLen(_arg2)
  } catch (e) {
    // console.log(e)
  }
  const maxLen = _len1 + _len2
  const res =
    (_arg1.replace('.', '') * _arg2.replace('.', '')) / Math.pow(10, maxLen)
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
export function divide (arg1, arg2) {
  let _len1, _len2
  const _arg1 = arg1.toString()
  const _arg2 = arg2.toString()
  try {
    _len1 = getDecimalLen(_arg1)
    _len2 = getDecimalLen(_arg2)
  } catch (e) {
    // console.log(e)
  }
  const m = _len2 - _len1
  const res = (_arg1.replace('.', '') / _arg2.replace('.', '')) * Math.pow(10, m)
  return +res
}
