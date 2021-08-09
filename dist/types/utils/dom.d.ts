/**
 * @fileOverview dom相关处理函数
 * @module Dom
 */
/**
 * @description 判断元素是否包含类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要查找的类名
 * @return {boolean} 返回true或false
 */
export declare function hasClass(target: HTMLElement | string, className: string): boolean;
/**
 * @description 添加class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要添加的类名
 * @returns {*} none
 */
export declare function addClass(target: HTMLElement | string, className: string): void;
/**
 * @description 移除class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要移除的类名
 * @returns {*} none
 */
export declare function removeClass(target: HTMLElement | string, className: string): void;
/**
 * @description 是否到达页面底部
 * @param {number} [offset=0] 距离页面底部的偏移
 * @returns
 */
export declare const bottomVisible: (offset?: number) => boolean;
/**
 * @description 判断元素是否在可视范围内
 * @param {*} el 页面元素
 * @param {boolean} [partiallyVisible=false] 是否为部分可见
 * @returns
 */
export declare function elementIsVisibleInViewport(el: HTMLElement, partiallyVisible?: boolean): boolean;
/**
 * @description 复制文本
 * @param {*} str
 */
export declare function copy(str: string): void;
/**
 * @description 返回页面顶部动画
 */
export declare function scrollToTop(): void;
/**
 * @description 滚动到页面指定位置
 * @param scrollTop
 */
export declare const scrollTo: (scrollTop: number) => void;
/**
 * @description: 禁止页面滚动/允许页面滚动 需要为body添加fixed样式
 * @param {type}
 * @returns
 */
export declare const lockMaskScroll: {
    afterOpen: () => void;
    beforeClose: () => void;
};
/**
 * @description 找到某个元素最近的包含指定选择器的父级元素
 * @param {*} el 元素
 * @param {*} selector 选择器
 * @returns 父级元素
 */
export declare const closest: (el: any, selector: any) => any;
