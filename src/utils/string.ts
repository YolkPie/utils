/**
 * @fileOverview 字符串相关处理函数
 * @module string
 */

/**
 * @description 去除字符串左边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimLeft("   123   ") //=> "123   "
 * trimLeft("aaa123aaaa", "a") // => "123aaaa"
 */
export function trimLeft (str: string, char: string = ' ') {
  try {
    const regExp = new RegExp(char + '*')
    return str.replace(regExp, '')
  } catch (e) {
    return ''
    // console.log(e)
  }
}

/**
 * @description 去除字符串右边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimRight("   123   ") //=> "   123"
 * trimRight("aaa123aaaa", "a") // => "aaa123"
 */
export function trimRight (str: string, char: string = ' ') {
  try {
    const regExp = new RegExp(char + '*$')
    return str.replace(regExp, '')
  } catch (e) {
    return ''
    // console.log(e)
  }
}

/**
 * @description 去除字符串中所有要去除的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimAll("  1  2  3   ") //=> "123"
 * trimAll("aaa12aa3aaaa", "a") // => "123"
 */
export function trimAll (str: string, char: string = ' ') {
  try {
    const regExp = new RegExp(char + '*', 'g')
    return str.replace(regExp, '')
  } catch (e) {
    return ''
    // console.log(e)
  }
}

/**
 * @description 去除字符串左边和右边的字符
 * @param {string} str - 要处理的字符串
 * @param {string} char - 要移除的字符, 默认为空格
 * @returns {string}  返回处理后的字符串
 * @example
 * trimLandR("   123   ") //=> "123"
 * trimLandR("aaa123aaa", "a") // => "123"
 */
export function trimLandR (str: string, char: string = ' ') {
  try {
    const regExp = new RegExp('^' + char + '*|' + char + '*$', 'g')
    return str.replace(regExp, '')
  } catch (e) {
    // console.log(e)
  }
}

/**
 * @description 判断字符长度，区分中英文
 * @param {String} str - 字符串
 * @returns {Number} - 返回字符长度
 */
export function getGbLen (str: string): number {
  let len = 0
  const content = str || ''
  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) > 127 || content.charCodeAt(i) === 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}

/**
 * @description 截取字符，区分中英文
 * @param {String} str - 字符串
 * @param {Number} len - 字符串截取长度
 * @returns {String} - 返回截取后字符
 */
export function subGbString (str: string, len: number) {
  // eslint-disable-next-line
  const regexp = /[^\x00-\xff]/g // 正则表达式匹配中文
  // 当字符串字节长度小于指定的字节长度时
  if (str.replace(regexp, 'aa').length <= len) {
    return str
  }
  // 假设指定长度内都是中文
  const m = Math.floor(len / 2)
  for (let i = m, j = str.length; i < j; i++) {
    // 当截取字符串字节长度满足指定的字节长度
    if (str.substring(0, i).replace(regexp, 'aa').length >= len) {
      return str.substring(0, i)
    }
  }
}
