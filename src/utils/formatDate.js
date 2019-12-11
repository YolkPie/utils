import { replaceByMath } from '../depend/replaceByMath'

/**
 * @description 格式化日期
 * @author yujihu
 * @param {Date|string|number} date - 日期或者时间戳
 * @param {string} format - 日期格式
 * @returns {string} 格式化后的日期
 * @example
 * formatDate('2018-9-9') //=> 2018-09-09
 * formatDate(new Date('2018-09-21'), 'YY-M-D') //=> 18-9-21
 * formatDate(new Date('2018-09-21'), 'YYYY 年 M 月 D 日 周WW') //=> 2018 年 9 月 21 日 周五
 */
export function formatDate (date, format = 'YYYY-MM-DD') {
  const _date = new Date(date)
  const year = _date.getFullYear()
  const month = _date.getMonth() + 1
  const day = _date.getDate()
  const week = _date.getDay()
  const hour = _date.getHours()
  const min = _date.getMinutes()
  const sec = _date.getSeconds()
  const upWeek = ['日', '一', '二', '三', '四', '五', '六']
  // 两位数补全
  const getReal = number => {
    const full = number > 9 ? number + '' : '0' + number
    return replaceByMath(str => {
      return str.length === 2 ? full : number + ''
    })
  }
  const res = format
    .replace(
      /([Y]+)/g,
      replaceByMath(str => {
        return str.length === 4 ? year + '' : (year + '').slice(2)
      })
    )
    .replace(
      /([W]+)/g,
      replaceByMath(str => {
        return str.length === 2 ? upWeek[week] : week + ''
      })
    )
    .replace(/([M]+)/g, getReal(month))
    .replace(/([D]+)/g, getReal(day))
    .replace(/([h]+)/g, getReal(hour))
    .replace(/([m]+)/g, getReal(min))
    .replace(/([s]+)/g, getReal(sec))
  return res
}
