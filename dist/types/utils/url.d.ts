/**
 * @fileOverview url相关处理函数
 * @module urls
 */
interface AnyType {
    [key: string]: any;
}
declare type GetQueryRes = string | AnyType;
/**
 * @description 获取url查询内容
 * @param {string} name - 要获取的查询字段
 * @returns {*} 如果传入name则返回它的值，不传则返回query组合对象
 */
export declare function getQuery(name: string): GetQueryRes;
/**
 * @description 获取url锚点
 * @returns {string} 返回最后面一个#后的值，没有时返回空字符串
 */
export declare function getHash(): string;
export {};
