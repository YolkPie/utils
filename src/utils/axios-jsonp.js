/**
 * @fileOverview axiox-jsonp
 * @module axios
 */

let cid = 1

function buildParams (params) {
  const result = []

  for (const i in params) {
    result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]))
  }

  return result.join('&')
}

export default function jsonpAdapter (config) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    let src = config.url

    if (config.params) {
      const params = buildParams(config.params)

      if (params) {
        src += (src.indexOf('?') >= 0 ? '&' : '?') + params
      }
    }

    script.async = true

    const jsonp = 'axiosJsonpCallback' + cid++
    const old = window[jsonp]
    let isAbort = false

    window[jsonp] = function (responseData) {
      window[jsonp] = old

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

    script.onerror = function (err) {
      script.onerror = null

      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }

      reject(err)
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then(function (cancel) {
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
