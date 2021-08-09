/**
 * @description 根据键值获取键名
 * @param {number|string} val - 键值
 * @param {object} obj - 被查找的对象
 * @returns {string}  返回键值对应的键名
 * @example
 * getKeyByVal(123, {name: 123}) //=> "name"
 */
interface AnyObj {
    [key: string]: any;
}
export declare function getKeyByVal(val: number | string, obj: AnyObj): string;
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
export declare function getValByVal(val: string | number, list: Array<any>, field: AnyObj): any;
/**
 * @description 创建一个从 object 中选中的属性的对象
 * @param {object} obj - 来源对象
 * @param {array} props - 要选中的属性名
 * @returns {object} 返回新对象
 * @example
 * pick([{name: 'jad', age: 12, sex: '男'}], ['name', 'sex']) //=> {name: 'jad', sex: '男'}
 */
export declare function pick(obj: AnyObj, props: string[]): AnyObj | undefined;
/**
 * @description 将对象转换为对象数组，数组项中内容为原有的键及值，对应的key由参数决定
 * @param {Object} obj 待转换对象
 * @param {String} keyConvert 对象key值转换为对象数组后，值对应的key
 * @param {String} valueConvert 对象value值转换为对象数组后，值对应的key
 * @returns {Array} 返回对象数组
 */
export declare function objectToObjArray(obj: AnyObj, keyConvert: string, valueConvert: string): AnyObj[];
/**
 * @description 深拷贝
 * @param {*} val 待转换值
 * @returns {*} 返回值
 */
export declare function deepCopy(val: any): any;
/**
 * @description 混合为真实请求的参数
 * @param {Object} params 接口参数
 * @param {Object} paramsMap 参数映射 - e.g {businessType: 'bussinessType', type: 'tabType'}
 * @returns {Object} 真实请求的对象 - e.g {bussinessType: 0, tabType: 2}
 * @example
 * mixParams({status: 0, type: 2}, {type: 'businessType', status: 'status'}) //=> {businessType: 2, status: 0}
 */
export declare function mixParams(params: AnyObj, paramsMap: AnyObj): AnyObj;
/**
 * @description 将复杂数组根据某个键值转化为对象
 * @param {Array} list 数组
 * @param {String} key 键值名称
 * @returns {Object} 转化后的对象
 * @example
 * listToHash([{label: '审核通过', value: 1}, {label: '驳回', value: -1}], 'value')
 */
export declare function listToHash(list: Array<any>, key: string): any;
export {};
