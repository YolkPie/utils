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
export declare function trimLeft(str: string, char?: string): string;
/**
 * @description 去除字符串右边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimRight("   123   ") //=> "   123"
 * trimRight("aaa123aaaa", "a") // => "aaa123"
 */
export declare function trimRight(str: string, char?: string): string;
/**
 * @description 去除字符串中所有要去除的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimAll("  1  2  3   ") //=> "123"
 * trimAll("aaa12aa3aaaa", "a") // => "123"
 */
export declare function trimAll(str: string, char?: string): string;
/**
 * @description 去除字符串左边和右边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimLandR("   123   ") //=> "123"
 * trimLandR("aaa123aaa", "a") // => "123"
 */
export declare function trimLandR(str: string, char?: string): string | undefined;
/**
 * @description 判断字符长度，区分中英文
 * @param {String} str - 字符串
 * @returns {Number} - 返回字符长度
 */
export declare function getGbLen(str: string): number;
/**
 * @description 截取字符，区分中英文
 * @param {String} str - 字符串
 * @param {Number} len - 字符串截取长度
 * @returns {String} - 返回截取后字符
 */
export declare function subGbString(str: string, len: number): string | undefined;
