/**
 * @description 自定义返回值的替换函数
 * @author yujihu
 * @param {Function} fn 自定义替换值的函数，会以匹配到的字符串为参数调用该函数
 * @returns {Function} 返回一个供正则匹配替换使用函数，
 */
export function replaceByMath (fn) {
  return (match, str) => {
    if (!str) return match
    return fn(str)
  }
}
