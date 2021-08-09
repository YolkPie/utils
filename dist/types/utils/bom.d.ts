/**
 * @fileOverview 浏览器相关处理函数
 * @module Bom
 */
/**
 * @description 判断是否是iphoneX系列机型，现在 iPhone 在 iPhone X 之后的机型都需要适配，所以可以对 X 以后的机型统一处理，我们可以认为这系列手机的特征是 ios + 长脸
 * @returns {Boolean}
 */
export declare const isIphoneX: () => boolean;
/**
 * @description 判断浏览器是否支持webp文件格式
 * @returns {Boolean}
 */
export declare const isSupportWebp: () => any;
/**
 * @description 获取环境信息
 * @returns {string}
 */
export declare const getEnv: () => "h5" | "pc" | "weixin" | "qq";
/**
 * @description 获取设备类型
 * @returns {string}
 */
export declare const getDevice: () => "iphone" | "ipad" | "android" | "";
