/**
 * @description 获取小数位数
 * @param {number|string} value 被获取的值：string类型只支持数字字符串,例"123"
 * @returns {numbe} 小数位数
*/
type Param = number | string
export function getDecimalLen (value: Param): number {
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error('参数类型错误')
  }
  const _len = value.toString().split('.')[1]
    ? value.toString().split('.')[1].length
    : 0
  return _len
}
