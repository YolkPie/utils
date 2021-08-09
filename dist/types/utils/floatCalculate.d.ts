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
export declare function add(arg1: number, arg2: number): number;
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
export declare function subtract(arg1: number, arg2: number): number;
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
export declare function multiply(arg1: number, arg2: number): number;
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
export declare function divide(arg1: number, arg2: number): number;
