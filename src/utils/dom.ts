import { getType } from '../depend/getType'

/**
 * @fileOverview dom相关处理函数
 * @module Dom
 */

/**
 * @description 判断元素是否包含类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要查找的类名
 * @return {boolean} 返回true或false
 */
export function hasClass (target: HTMLElement | string, className: string): boolean {
  if ((<HTMLElement>target).classList) {
    return (<HTMLElement>target).classList.contains(className)
  } else {
    const dom =
      <HTMLElement>(getType(target) === 'String' ? document.querySelector(<string>target) : target)
    if (!dom) return false
    return ` ${dom.className} `.indexOf(` ${className} `) > -1
  }
}

/**
 * @description 添加class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要添加的类名
 * @returns {*} none
 */
export function addClass (target: HTMLElement | string, className: string) {
  if (!target || !className) return
  if (!hasClass(target, className)) {
    if ((<HTMLElement>target).classList) {
      (<HTMLElement>target).classList.add(className)
    } else {
      const dom =
        <HTMLElement>(getType(target) === 'String' ? document.querySelector(<string>target) : target)
      if (!dom) return
      const currentCls = dom.className
      dom.className = `${currentCls} ${className}`
    }
  }
}

/**
 * @description 移除class类名
 * @param {string|HTMLElement} target CSS选择器或Dom元素
 * @param {string} className 要移除的类名
 * @returns {*} none
 */
export function removeClass (target: HTMLElement | string, className: string) {
  if (!target || !className) return
  if (hasClass(target, className)) {
    if ((<HTMLElement>target).classList) {
      (<HTMLElement>target).classList.remove(className)
    } else {
      const dom =
        <HTMLElement>(getType(target) === 'String' ? document.querySelector(<string>target) : target)
      /* istanbul ignore next */
      if (!dom) return
      const currentCls = dom.className
      const clsArr = currentCls.split(' ')
      const resArr = clsArr.filter(item => item !== className)
      dom.className = resArr.join(' ')
    }
  }
}

/**
 * @description 是否到达页面底部
 * @param {number} [offset=0] 距离页面底部的偏移
 * @returns
 */
export const bottomVisible = (offset: number = 0) => {
  return Math.ceil(document.documentElement.clientHeight + window.scrollY) + offset >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
}

/**
 * @description 判断元素是否在可视范围内
 * @param {*} el 页面元素
 * @param {boolean} [partiallyVisible=false] 是否为部分可见
 * @returns
 */
export function elementIsVisibleInViewport (el: HTMLElement, partiallyVisible: boolean = false): boolean {
  const { top, left, bottom, right } = el.getBoundingClientRect()

  return partiallyVisible
    ? ((top > 0 && top < window.innerHeight) ||
        (bottom > 0 && bottom < window.innerHeight)) &&
        ((left > 0 && left < window.innerWidth) || (right > 0 && right < window.innerWidth))
    : top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth
}

/**
 * @description 复制文本
 * @param {*} str
 */
export function copy (str: string) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.top = '-9999px'
  document.body.appendChild(el)
  const getSelection = document.getSelection()
  const selected = getSelection && getSelection.rangeCount > 0 ? getSelection.getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (getSelection && selected) {
    getSelection.removeAllRanges()
    getSelection.addRange(selected)
  }
}

/**
 * @description 返回页面顶部动画
 */
export function scrollToTop(): void {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let requestId: any
  requestId = window.requestAnimationFrame(function fn() {
    if (scrollTop > 0) {
      requestId = window.requestAnimationFrame(fn)
      window.scrollTo(0, scrollTop - scrollTop / 8)
    } else {
      if(requestId) { window.cancelAnimationFrame(requestId) }
    }
  })
  if (scrollTop > 0) {
    requestId = window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  } else {
    if(requestId) { window.cancelAnimationFrame(requestId) }
  }
}

/**
 * @description 滚动到页面指定位置
 * @param scrollTop
 */
export const scrollTo: (scrollTop: number)=> void = (scrollTop: number) => {
  let topTimer: any = null
  if (topTimer) { window.cancelAnimationFrame(topTimer) }
  topTimer = window.requestAnimationFrame(function fn () {
    const oTop = document.body.scrollTop || document.documentElement.scrollTop
    if (oTop > scrollTop) {
      if (oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop =
          oTop - Math.floor((oTop - scrollTop) / 3)
        topTimer = window.requestAnimationFrame(fn)
        ;(oldTop => {
          if (Math.abs(oldTop - oTop) <= 2) {
            window.cancelAnimationFrame(topTimer)
          }
        })(document.documentElement.scrollTop || document.body.scrollTop)
      } else {
        window.cancelAnimationFrame(topTimer)
      }
    } else if (oTop < scrollTop) {
      document.body.scrollTop = document.documentElement.scrollTop =
        oTop + Math.ceil((scrollTop - oTop) / 3)
      topTimer = window.requestAnimationFrame(fn)
      ;(oldTop => {
        if (Math.abs(oldTop - oTop) <= 2) {
          window.cancelAnimationFrame(topTimer)
        }
      })(document.documentElement.scrollTop || document.body.scrollTop)
    } else {
      window.cancelAnimationFrame(topTimer)
    }
  })
}

/**
 * @description: 禁止页面滚动/允许页面滚动 需要为body添加fixed样式
 * @param {type}
 * @returns
 */
export const lockMaskScroll = (bodyCls => {
  let scrollTop: number
  let lockedCount = 0
  return {
    afterOpen: function () {
      lockedCount++
      if (document.body.classList.contains(bodyCls)) return
      scrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.body.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -scrollTop + 'px'
    },
    beforeClose: function () {
      if (--lockedCount > 0) return
      if (document.body.classList.contains(bodyCls)) {
        document.body.classList.remove(bodyCls)
        if (document.scrollingElement) {
          document.scrollingElement.scrollTop = scrollTop
        }
      }
    }
  }
})('dialog-open')

/**
 * @description 找到某个元素最近的包含指定选择器的父级元素
 * @param {*} el 元素
 * @param {*} selector 选择器
 * @returns 父级元素
 */
export const closest = (el: any, selector: any) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    } else {
      el = el.parentElement
    }
  }
  return null
}
