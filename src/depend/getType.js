/**
 * @description 获取类型
 * @param {*} value 要获取类型的值
 * @returns {*|string} 数据类型：如 String, Number, Object, Array, Null, Date, Symbol
 */
export function getType (value) {
  const o = {}
  const type = o.toString.call(value)
  const typeArr = /^\[object (\w+)\]$/.exec(type)
  return typeArr[1]
}
