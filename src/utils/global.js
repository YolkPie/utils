import { getType } from '../depend/getType'

/**
 * @description 根据键值获取键名
 * @param {number|string} val - 键值
 * @param {object} obj - 被查找的对象
 * @returns {string}  返回键值对应的键名
 * @example
 * getKeyByVal(123, {name: 123}) //=> "name"
 */
export function getKeyByVal (val, obj) {
  if (getType(obj) !== 'Object') {
    /* istanbul ignore next */
    return ''
  }
  const keys = Object.keys(obj)
  let res = ''
  for (const i of keys) {
    if (obj[i] === val) {
      res = i
      break
    }
  }
  return res
}

/**
 * @description 根据键值获取同个对象中指定键名的值
 * @param {string|number} val - 查找的键值
 * @param {array} list - 对象数组[{},{}]
 * @param {object} field - 键名设置对象，默认为{key: 'key', value: 'value'}
 * @returns {string|number} 返回被查找的键值
 * @example
 * getValByVal(12, [{name: 'jad', age: 12}], {key: 'name', value: 'age'}) //=> "jad"
 * getValByVal(2, [
            {key: '审核通过', value: 2},
            {key: '审核驳回', value: -2},
            {key: '待审核', value: 0},
            {key: '下线', value: -3},
        ]) //=> "审核通过"
 */
export function getValByVal (val, list, field) {
  const defaultField = { key: 'key', value: 'value' }
  const fields = Object.assign({}, defaultField, field)
  try {
    for (const item of list) {
      if (item[fields.value] === val) {
        return item[fields.key]
      }
    }
  } catch (e) {
    /* istanbul ignore next */
    // console.log(e);
  }
}

/**
 * @description 创建一个从 object 中选中的属性的对象
 * @param {object} obj - 来源对象
 * @param {array} props - 要选中的属性名
 * @returns {object} 返回新对象
 * @example
 * pick([{name: 'jad', age: 12, sex: '男'}], ['name', 'sex']) //=> {name: 'jad', sex: '男'}
 */
export function pick (obj, props) {
  if (getType(obj) !== 'Object' && getType(props) !== 'Array') {
    /* istanbul ignore next */
    return
  }
  const res = {}
  props.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = obj[key]
    }
  })
  return res
}

/**
 * @description 将对象转换为对象数组，数组项中内容为原有的键及值，对应的key由参数决定
 * @param {Object} obj 待转换对象
 * @param {String} keyConvert 对象key值转换为对象数组后，值对应的key
 * @param {String} valueConvert 对象value值转换为对象数组后，值对应的key
 * @returns {Array} 返回对象数组
 */
export function objectToObjArray (obj, keyConvert, valueConvert) {
  if (
    getType(obj) !== 'Object' ||
    getType(keyConvert) !== 'String' ||
    getType(valueConvert) !== 'String'
  ) {
    console.warn('参数格式错误！')
    return []
  }
  return Object.entries(obj).map(item => {
    const obj = {}
    obj[keyConvert] = item[0]
    obj[valueConvert] = item[1]
    return obj
  })
}

/**
 * @description 深拷贝
 * @param {*} val 待转换值
 * @returns {*} 返回值
 */
export function deepCopy (val) {
  const type = getType(val)
  if (type !== 'Object' && type !== 'Array') {
    return val
  }
  const result = type === 'Array' ? [] : {}
  for (const i in val) {
    if (Object.prototype.hasOwnProperty.call(val, i)) {
      if (
        val[i] &&
        (getType(val[i]) === 'Object' || getType(val[i]) === 'Array')
      ) {
        result[i] = deepCopy(val[i])
      } else {
        result[i] = val[i]
      }
    }
  }
  return result
}

/**
 * @description 混合为真实请求的参数
 * @param {Object} params 接口参数
 * @param {Object} paramsMap 参数映射 - e.g {businessType: 'bussinessType', type: 'tabType'}
 * @returns {Object} 真实请求的对象 - e.g {bussinessType: 0, tabType: 2}
 * @example
 * mixParams({status: 0, type: 2}, {type: 'businessType', status: 'status'}) //=> {businessType: 2, status: 0}
 */
export function mixParams (params, paramsMap) {
  const keys = Object.keys(params)
  if (!keys.length) return params
  return keys.reduce((pre, item) => {
    const key = paramsMap[item] || item
    pre[key] = params[item]
    return pre
  }, {})
}

/**
 * @description 将复杂数组根据某个键值转化为对象
 * @param {Array} list 数组
 * @param {String} key 键值名称
 * @returns {Object} 转化后的对象
 * @example
 * listToHash([{label: '审核通过', value: 1}, {label: '驳回', value: -1}], 'value')
 */
export function listToHash (list, key) {
  return list.reduce((pre, item) => {
    const objKey = item[key]
    if (objKey !== undefined) {
      pre[objKey] = item
    }
    return pre
  }, {})
}
