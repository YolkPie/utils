/**
 * @fileOverview 事件处理相关函数
 * @module Event
 */

/**
 * @description 事件监听器
 * @param {HTMLElement|window} el 监听的dom
 * @param {String} event 事件名称
 * @param {Function} cb 回调函数
 * @returns {Object} {{remove(): void}} 包含移除事件的对象
 */
export function listener (el: any, event: string, cb: any) {
  if (el.addEventListener) {
    el.addEventListener(event, cb, false)
    return {
      remove () {
        el.removeEventListener(event, cb, false)
      }
    }
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, cb)
    return {
      remove () {
        el.detachEvent('on' + event, cb)
      }
    }
  }
}

/**
 * @description 绑定事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
export const on = (function () {
  // @ts-ignore
  if (document.addEventListener) {
    return function (element: any, event: 'string', handler: any) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element: any, event: 'string', handler: any) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件
 * @param {*} element 页面元素
 * @param {*} event 事件名
 * @param {*} handler 处理函数
 */
export const off = (function () {
  // @ts-ignore
  if (document.removeEventListener) {
    return function (element: any, event: 'string', handler: any) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element: any, event: 'string', handler: any) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
