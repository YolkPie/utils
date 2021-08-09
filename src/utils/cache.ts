/**
 * @fileOverview 本地存储处理操作封装
 * @module cache
 */

const __session__ = window.sessionStorage
const __local__ = window.localStorage

const TYPES = ['session', 'local']
const DEFAULT_CACHE = TYPES[0]
interface AnyObj {
  [key: string]: any
}
const cache: AnyObj = {
  set: (key: string, value: any, type: string = DEFAULT_CACHE) => {
    try {
      !(type in TYPES) && (type = DEFAULT_CACHE)
      cache[type].set(key, value)
      return cache[type]
    } catch (e) {
      return cache[type]
    }
  },
  get: (key: string, type: string = DEFAULT_CACHE) => {
    try {
      !(type in TYPES) && (type = DEFAULT_CACHE)
      return cache[type].get(key)
    } catch (e) {
      return null
    }
  },
  clear: (type = DEFAULT_CACHE) => {
    try {
      !(type in TYPES) && (type = DEFAULT_CACHE)
      cache[type].clear()
      return cache[type]
    } catch (e) {
      return cache[type]
    }
  },
  remove: (key: string, type = DEFAULT_CACHE) => {
    try {
      cache[type].remove(key)
      return cache
    } catch (e) {
      return cache
    }
  },
  session: {
    set: (key: string, value: any) => {
      try {
        __session__.setItem(key, JSON.stringify(value))
        return cache.session
      } catch (e) {
        return cache.session
      }
    },
    get: (key: string) => {
      try {
        const value = __session__.getItem(key)
        return key && JSON.parse(<string>value)
      } catch (e) {
        return null
      }
    },
    remove: (key: string) => {
      try {
        __session__.removeItem(key)
        return cache.session
      } catch (e) {
        return cache.session
      }
    },
    clear: () => {
      try {
        __session__.clear()
        return cache.session
      } catch (e) {
        return cache.session
      }
    }
  },
  local: {
    set: (key: string, value: any, isTimeout = false, expireTime = 1000 * 60 * 60 * 24) => {
      try {
        // 如果开启过期，默认过期时间为一天 1000 * 60 * 60 * 24，时间单位为毫秒
        const localObj = {
          now: +new Date(),
          expire: isTimeout ? expireTime : 0,
          data: value
        }
        __local__.setItem(key, JSON.stringify(localObj))
        return cache.local
      } catch (e) {
        return cache.local
      }
    },
    get: (key: string) => {
      try {
        const value = __local__.getItem(key)
        let localData = null
        let data = null
        // 是否存在key对应的localstorage值
        if (value) {
          localData = JSON.parse(value)
        }
        // 是否存在data属性，有为新的数据格式
        if (localData && localData.data) {
          // 数据是否过期
          const diff =
            localData.expire > 0 &&
            +new Date() - localData.now * 1 > localData.expire
          // 过期，删除数据
          if (diff) {
            cache.local.remove(key)
          } else {
            data = localData.data
          }
        } else {
          data = localData
        }
        return data
      } catch (e) {
        return null
      }
    },
    remove: (key: string) => {
      try {
        __local__.removeItem(key)
        return cache.local
      } catch (e) {
        return cache.local
      }
    },
    clear: () => {
      try {
        __local__.clear()
        return cache.local
      } catch (e) {
        return cache.local
      }
    }
  }
}

export default cache
