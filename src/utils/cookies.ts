import { getType } from '../depend/getType'
type Time = string | number | Date

/**
 * @fileOverview cookie相关处理函数
 * @module cookie
 */

/**
 * @description 获取cookie
 * @author yujihu
 * @param {string} key - 要获取的某个cookie键值
 * @returns {string} cookie值
 * @example
 * getCookie('pin')
 */
export function getCookie (key: string): string {
  const cookie = document.cookie
  if (!key) return cookie
  const cookies = cookie.split('; ')
  for (const item of cookies) {
    const cookieArr = /^([^=]+)=([^=]+)$/.exec(item)
    if (cookieArr && cookieArr[1] === key) {
      return unescape(cookieArr[2])
    }
  }
  return ''
}

/**
 * @description 设置cookie
 * @author yujihu
 * @param {string} key - cookie名称
 * @param {string} value - cookie值
 * @param {string|number|date} expires - 过期时间，支持传入'd30','h12','m20'代表有效期30天、12小时、20分
 * @returns {undefined}
 * @example
 * setCookie('pin', 'test_pop_115', 'd30') //=> 有效期30天
 * setCookie('pin', 'test_pop_115', 'h12') //=> 有效期12小时
 * setCookie('pin', 'test_pop_115', 'm2') //=> 有效期2分钟
 */
export function setCookie (key: string, value: string, expires: Time) {
  if (!key || !value) return
  const getExpires = (time: Time) => {
    const type = getType(time)
    let expiresStr = ';expires='
    if (['Date', 'Number'].includes(type)) {
      expiresStr += new Date(time).toUTCString()
    } else if (type === 'String') {
      // 支持传入'd30', 'h12', 'm20'
      const timeType = /^(d|h|m)(\d+)$/.exec(<string>time)
      if (!timeType) return ''
      const date = new Date()
      switch (timeType[1]) {
        case 'd':
          date.setTime(date.getTime() + 3600 * 1000 * 24 * +timeType[2])
          break
        case 'h':
          date.setTime(date.getTime() + 3600 * 1000 * +timeType[2])
          break
        default:
          date.setTime(date.getTime() + 60 * 1000 * +timeType[2])
      }
      expiresStr += date.toUTCString()
    } else {
      expiresStr = ''
    }
    return expiresStr
  }
  const expiresTime = expires ? getExpires(expires) : ''
  document.cookie = key + '=' + escape(value) + expiresTime
}

/**
 * @description 删除cookie
 * @author yujihu
 * @param {string} key - 要删除的cookie键值
 * @returns {undefined}
 * @example
 * getCookie('pin') //=> test_pop_115
 * delCookie('pin')
 * getCookie('pin') //=> ''
 */
export function delCookie (key: string) {
  if (!key) return
  const currentCookie = getCookie(key)
  const date = new Date()
  const expiresTime = date.setTime(date.getTime() - 86400000)
  const expiresStr = ';expires=' + new Date(expiresTime).toUTCString()
  document.cookie = key + '=' + escape(currentCookie) + expiresStr
}
