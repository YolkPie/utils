export declare const throttle: (fn: any, interval?: number) => () => void;
/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export declare const debounce: (fn: any, interval?: number) => () => void;
/**
 * @description 处理图片加载失败
 */
export declare const handleImgError: (errImgUrl?: string | undefined) => void;
