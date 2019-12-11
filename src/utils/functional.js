/**
 * @fileOverview 函数式编程相关函数
 * @module Functional
 */

/**
 * @description 组合函数
 * @param {*}
 * @returns
 */
export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

/**
 * @description 科里化
 * @param {*}
 * @returns
 */
export const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)
