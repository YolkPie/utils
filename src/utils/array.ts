/**
 * @fileOverview 数组相关处理函数
 * @module Array
 */

/**
 * @description 是否是类数组对象
 * @param {*} obj
 * @returns
 */
export const isArrayLike = (obj: any) =>
  obj != null && typeof obj[Symbol.iterator] === 'function'
