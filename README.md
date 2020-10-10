# YolkPie/utils（前端工具类库收集）

### 介绍

**utils包中收集了在业务中经常使用的工具方法，供大家引用，避免了不同项目中方法重复开发的问题**

### 文档

[https://yolkpie.net/yolk-cli/support/utils/](https://yolkpie.net/yolk-cli/support/utils/)

### 使用
1. 安装依赖包
```
npm i @yolkpie/utils
```
2. 在项目中引用
```
import { addClass } from '@yolkpie/utils'
```

### 指令
```
npm install         # 安装依赖
npm run dev         # 本地开发
npm run build       # 打包
```

### 开发
1. 将相应的工具方法添加到`utils`目录对应的文件下，并进行导出`export`，例如：数组相关方法添加到`utils/array.js`下；
2. 在`index.js`中`import`新加的工具方法，并进行导出`export`；
3. 运行`npm run build`进行打包；
4. 将打包后的文件上传至npm。

### 目录

```
├── src
│   ├── depend                         # 公共方法
│   ├── index.js                       # 主入口
│   └── utils
│       ├── array.js                   # 数组
│       ├── axios-jsonp.js             # axios jsonp跨域
│       ├── bom.js                     # 浏览器对象
│       ├── cache.js                   # 缓存
│       ├── cookies.js                 # cookie
│       ├── dom.js                     # 文档对象
│       ├── event.js                   # 事件
│       ├── fixMask.js                 # 显示弹层时固定背景
│       ├── floatCalculate.js          # 浮点数
│       ├── formatDate.js              # 格式化日期
│       ├── functional.js              # 函数式编程
│       ├── global.js                  # 全局
│       ├── math.js                    # 数值
│       ├── rem.js                     # 移动端适配
│       ├── string.js                  # 字符串
│       ├── tools.js                   # 工具
│       └── url.js                     # 链接
├── rollup.config.js                   # 打包配置文件
└── package.json
```

### 贡献

如果你在业务中还经常使用某些工具方法，但是该包中未包括，欢迎给我们提 [issue](https://github.com/YolkPie/utils/issues)

当然你也可以给我们提PR，项目地址为：[YolkPie/utils](https://github.com/YolkPie/utils)
