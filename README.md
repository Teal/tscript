tscript
===========================================
编译 EcmaScript 7 和 TypeScript 到 JavaScript。

安装
-------------------------------
```
$ npm install tscript -g
```

特点
-------------------------------
1. 包含官方 TypeScript 编译器的所有功能，用法相同，语法完全兼容。
2. 能将 EcmaScript 7 和 TypeScript 编译成 EcmaScript 3/5/6，可完全代替 Babel，编译速度比 Babel 快 4 倍。
3. 生成的代码比官方的 TypeScript 更精简、高效。
4. 支持删除无用的 `import` 指令和 `export` 部分。
5. 支持生成无依赖的纯 JavaScript 代码。
6. 支持生成老浏览器(如 IE6) 的代码。
7. 支持文档生成。