import cache from './cache'

/**
 * @fileOverview 浏览器相关处理函数
 * @module Bom
 */

/**
 * @description 判断是否是iphoneX系列机型，现在 iPhone 在 iPhone X 之后的机型都需要适配，所以可以对 X 以后的机型统一处理，我们可以认为这系列手机的特征是 ios + 长脸
 * @returns {Boolean}
 */
export const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return (
      /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
    )
  }
  return false
}

/**
 * @description 判断浏览器是否支持webp文件格式
 * @returns {Boolean}
 */
export const isSupportWebp = () => {
  if (cache.local.get('support_webp') !== null) {
    return cache.local.get('support_webp')
  } else {
    const isSupport =
      !![].map &&
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    cache.local.set('support_webp', isSupport)
    return isSupport
  }
}

/**
 * @description 获取环境信息
 * @returns {string}
 */
export const getEnv = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (!/mobile|android/.test(ua)) {
    return 'pc'
  } else {
    if (/micromessenger(\/[\d]+)*/.test(ua)) {
      return 'weixin'
    } else if (/qq\/(\/[\d]+)*/.test(ua) || /qzone\//.test(ua)) {
      return 'qq'
    } else {
      return 'h5'
    }
  }
}

/**
 * @description 获取设备类型
 * @returns {string}
 */
export const getDevice = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('iphone') !== -1) {
    return 'iphone'
  } else if (ua.indexOf('ipad') !== -1) {
    return 'ipad'
  } else if (ua.indexOf('android') !== -1) {
    return 'android'
  }
  return ''
}
