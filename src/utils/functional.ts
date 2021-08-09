/**
 * @fileOverview 函数式编程相关函数
 * @module Functional
 */

/**
 * @description 组合函数
 * @param {*}
 * @returns
 */
export const compose = (...fns: any[]) =>
  fns.reduce((f, g) => (...args: any[]) => f(g(...args)))

/**
 * @description 科里化
 * @param {*}
 * @returns
 */
export const curry: (fn: any, arity: number, ...args: any[]) => any  = (fn: any, arity = fn.length, ...args: any[]) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)
