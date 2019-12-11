# fpfe-utils（前端工具类库收集）

### 介绍

**fpfe-utils包中收集了在业务中经常使用的工具方法，供大家引用，避免了不同项目中方法重复开发的问题**

### 使用方法
1. 私有的客户端 jnpm 来替代 npm 来进行私有库相关的操作
```
npm install @jd/jnpm -g --registry=http://registry.m.jd.com
```

2. 安装依赖包
```
jnpm i @jd/fpfe-utils
```
3. 在项目中引用
```
import { addClass } from '@jd/fpfe-utils'
```

### 贡献

如果你在业务中还经常使用某些工具方法，但是该包中未包括，欢迎给我们提 [issue](https://git.jd.com/nb-fe/fpfe-utils/issues)

当然你也可以给我们提PR，项目地址为：[fpfe-utils](https://git.jd.com/nb-fe/fpfe-utils)
