/**
 * @fileOverview url相关处理函数
 * @module urls
 */

/**
 * @description 获取url查询内容
 * @param {string} name - 要获取的查询字段
 * @returns {*} 如果传入name则返回它的值，不传则返回query组合对象
 */
export function getQuery (name) {
  let search = window.location.search.slice(1)
  if (!search) {
    search = window.location.href.split('?')[1]
  }
  if (!search) return ''
  const querys = search.split('&')
  const res = querys.reduce((pre, current) => {
    const currentArr = current.split('=')
    pre[currentArr[0]] = decodeURIComponent(currentArr[1])
    return pre
  }, {})
  return name ? res[name] : res
}

/**
 * @description 获取url锚点
 * @returns {string} 返回最后面一个#后的值，没有时返回空字符串
 */
export function getHash () {
  const hash = window.location.hash
  if (!hash) return ''
  const resArr = /#([^#]+)$/.exec(hash)
  return resArr ? resArr[1] : ''
}
