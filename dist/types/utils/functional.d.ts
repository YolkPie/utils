/**
 * @fileOverview 函数式编程相关函数
 * @module Functional
 */
/**
 * @description 组合函数
 * @param {*}
 * @returns
 */
export declare const compose: (...fns: any[]) => any;
/**
 * @description 科里化
 * @param {*}
 * @returns
 */
export declare const curry: (fn: any, arity: number, ...args: any[]) => any;
