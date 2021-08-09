declare type Time = string | number | Date;
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
export declare function getCookie(key: string): string;
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
export declare function setCookie(key: string, value: string, expires: Time): void;
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
export declare function delCookie(key: string): void;
export {};
