# devtools

devtools mini version

## 安装

```bash
$ npm install @jobtools/devtools --save
```

## 如何使用

文档参考：https://github.com/liriliri/eruda


```
import devtools from '@jobtools/devtools';

devtools();

// devtools(config?: {
    container?: any;  // 挂载的容器
    smart?: boolean;   // 是否为智能模式，智能模式是指仅在herf中__debug__=1时则开启devtools。默认为全部开启
    tool?: Array<toolType> | 'all';  // 指devtools的工具类型，目前有 'console' | 'elements' | 'network' | 'resource' | 'info' | 'snippets' | 'sources' | 'code' | 'dom' | 'fps' | 'features'
})

// 注：该包已经区分了 development 及 production，仅在development中有作用，production导出的内容仅是空函数
```