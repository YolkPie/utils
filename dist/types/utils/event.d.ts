/**
 * @fileOverview 事件处理相关函数
 * @module Event
 */
/**
 * @description 事件监听器
 * @param {HTMLElement|window} el 监听的dom
 * @param {String} event 事件名称
 * @param {Function} cb 回调函数
 * @returns {Object} {{remove(): void}} 包含移除事件的对象
 */
export declare function listener(el: any, event: string, cb: any): {
    remove(): void;
} | undefined;
/**
 * @description 绑定事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
export declare const on: (element: any, event: 'string', handler: any) => void;
/**
 * @description 解绑事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
export declare const off: (element: any, event: 'string', handler: any) => void;
