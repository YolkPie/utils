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
export declare function formatNum(num: number | string, char: string, pre?: string): string | number;
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
export declare function toFixed(num: string | number, len: number, type?: string): string | number;
/**
 * @description 最大公约数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最大公约数
 */
export declare function gcd(num1: number, num2: number): number;
/**
 * @description 最小公倍数
 * @param {number} num1 - 数值1
 * @param {number} num2 - 数值2
 * @returns {number}  返回最小公倍数
 */
export declare function scm(num1: number, num2: number): number;
