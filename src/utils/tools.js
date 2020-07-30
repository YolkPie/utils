/**
 * @description 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 interval 毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const throttle = (fn, interval = 300) => {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, interval)
  }
}

/**
 * @description 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 interval 毫秒之后. 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
export const debounce = (fn, interval = 300) => {
  let timeout = null
  return function () {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

/**
 * @description 处理图片加载失败
 */
export const handleImgError = () => {
  window.addEventListener(
    'error',
    function (e) {
      const target = e.target // 当前dom节点
      const tagName = target.tagName
      const count = Number(target.dataset.errcount) || 0 // 以失败的次数，默认为0
      const max = 3 // 总失败次数，此时设定为3
      // 当前异常是由图片加载异常引起的
      if (tagName.toUpperCase() === 'IMG') {
        if (count >= max) {
          target.src =
            'data:image/png;base64,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'
        } else {
          target.dataset.errcount = count + 1
          target.src = '//img14.360buyimg.com/imagetools/jfs/t1/101354/29/1631/2736/5dc26a29E38d15fe9/17a1d33c799d2dd4.png'
        }
      }
    },
    true
  )
}
