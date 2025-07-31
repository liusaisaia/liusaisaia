# TypeScript


::: info 文章信息
- **发布时间**: 2025-07-31
- **分类**: 技术
- **标签**: 博客, TypeScript
:::


### 基本的数据类型
TS继承了JS的数据类型 8种：boolean、string、number、bigint、symbol、object、undefined、null。上述类型都是小写字母，首字母大写都是JS的内置对象并不是类型名称。
object类型包含了所有的对象、数组和函数。

```ts
  const a:object = { foo: 123 }
  const b:object = [1, 2, 3]
  const c:object = (n:number) => n + 1
```

::: 安装typescript编译环境
  1. npm i rollup  打包工具
  2. Typescript
  3. rollup-plugin-typescript2 关联
  4. @rollup/plugin-node-resolve 解析第三方模块
  5. rollup-plugin-serve 预览html
:::
