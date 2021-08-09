/**
 * @description 获取小数位数
 * @param {number|string} value 被获取的值：string类型只支持数字字符串,例"123"
 * @returns {numbe} 小数位数
*/
declare type Param = number | string;
export declare function getDecimalLen(value: Param): number;
export {};
