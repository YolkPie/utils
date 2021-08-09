/**
 * @fileOverview axiox-jsonp
 * @module axios
 */
/* tslint:disable */
let cid = 1
interface AnyObj {
  [key: string]: any
}
interface Window {
  [key: string]: any
}

function buildParams (params: AnyObj) {
  const result = []

  for (const i in params) {
    result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]))
  }

  return result.join('&')
}

export default function jsonpAdapter (config: AnyObj) {
  return new Promise(function (resolve, reject) {
    let script: any = document.createElement('script')
    let src = config.url
    if (!/^([a-z][a-z\d\\+\-\\.]*:)?\/\//i.test(src)) {
      src = config.baseURL + src
    }

    if (config.params) {
      const params = buildParams(config.params)

      if (params) {
        src += (src.indexOf('?') >= 0 ? '&' : '?') + params
      }
    }

    script.async = true

    const jsonp: string = 'axiosJsonpCallback' + cid++
    // const
    let win: any = window
    const old = win[jsonp]
    let isAbort = false

    win[jsonp] = function (responseData: AnyObj) {
      win[jsonp] = old

      if (isAbort) {
        return
      }

      const response = {
        data: responseData,
        status: 200
      }

      resolve(response)
    }

    const additionalParams = {
      _: new Date().getTime()
    }

    // @ts-ignore
    additionalParams[config.callbackParamName || 'callback'] = jsonp

    src += (src.indexOf('?') >= 0 ? '&' : '?') + buildParams(additionalParams)

    script.onload = script.onreadystatechange = function () {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null

        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }

        script = null
      }
    }

    script.onerror = function (err: any) {
      script.onerror = null

      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }

      reject(err)
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then(function (cancel: any) {
        if (!script) {
          return
        }

        isAbort = true
        reject(cancel)
      })
    }

    script.src = src

    document.head.appendChild(script)
  })
}
