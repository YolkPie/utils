/**
 * @description 格式化日期
 * @author yujihu
 * @param {Date|string|number} date - 日期或者时间戳
 * @param {string} format - 日期格式
 * @returns {string} 格式化后的日期
 * @example
 * formatDate('2018-9-9') //=> 2018-09-09
 * formatDate(new Date('2018-09-21'), 'YY-M-D') //=> 18-9-21
 * formatDate(new Date('2018-09-21'), 'YYYY 年 M 月 D 日 周WW') //=> 2018 年 9 月 21 日 周五
 */
export declare function formatDate(date: Date | string | number, format?: string): string;
