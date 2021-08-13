---
title: 如何开发一个NPM包
date: 2020-08-13
tags:
  - NPM
categories:
  - NPM
---

## 前端模块化概念

进入正题之前，先初步了解一下几种常见的前端模块化概念。

### CommonJS

- CommonJS 是服务端模块的规范，在 NodeJS 中使用。一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为 global 对象的属性。
- 输出模块使用`module.exports`。
- 加载模块使用`require()`。

### AMD

全称`Asynchronous Module Definition`，异步模块规范。

- CommonJS 是同步加载，无法满足浏览器使用场景。AMD 是 RequireJS 的模块化规范，支持异步。
- 定义模块`define(id?, dependencies?, factory);`
- 加载模块`require([dependencies], function(){});`
- AMD 推崇依赖前置，在定义模块的时候就声明其依赖的模块。
- AMD 在加载模块后就会立即执行，所有模块都加载执行完成后，进入 require 回调函数、执行主逻辑。依赖模块加载顺序不一定与书写顺序保持一致，哪个先下载完成就先执行哪个，但是主逻辑一定在所有模块之后执行。

### CMD

全称`Common Module Definition`。

- CMD 也支持异步，是 SeaJS 的模块化规范。
- CMD 推崇就近依赖，只有在用到某个模块的时候再去 require。
- CMD 加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到 require 语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的。

### UMD

全称`Universal Module Definition`，通用模块规范。
UMD 将 CommonJS、AMD、CMD 等兼容处理

```js
(function (global, factory) {
 typeof exports === 'object' && typeof module !== 'undefined'
     ? module.exports = factory()          // Node , CommonJS
     : typeof define === 'function' && define.amd
       ? define(factory)                   //AMD CMD
       : (global.CodeMirror = factory());  //模块挂载到全局
}(this, (function () {
 ...
})
```

### ES6 Module

- 使用`export`和`import`进行模块定义和引入。
- 编译时加载。

参考文档：<https://zhuanlan.zhihu.com/p/41568986>

---

接下来进入正题 >>>

## 准备

1. 注册 NPM 账号。<https://www.npmjs.com>
2. 本地登录 npm 账号。`npm login`
3. 执行`npm whoami`，如果登录成功的话，会输出当前登录的用户名。

## 实现方案

### 1. NPM

1. 创建一个空文件夹并进入。
2. 初始化 package.json 文件。

   ```bash
   npm init -y
   ```

3. 修改 package.json 文件中的主要字段。

   - name，当前包名。
   - version，版本号。
   - description，描述信息。
   - main，入口文件。
   - 等等...

4. 编写逻辑代码。
5. 发布

   ```bash
   npm publish
   ```

   发布成功后，执行`npm view xxx`可以查看当前 npm 包发布信息。也可以登录<https://www.npmjs.com>查看已发布的包信息。

::: tip
注意：

npm 包命名时，为避免重名或者相似度过高导致引用错误，可以以`@私有空间名/包名`的格式设置包名。

```json
{
  "name": "@lee/utils"
}
```

该格式的包被默认为私有的，所有在发布时需要添加`--access=public`将其变为公有的包。

```bash
npm publish --access=public
```

:::

### 2. Rollup

有时候需要对 JS 代码进行编译打包后再进行发布。

如果是纯 JS 工具函数库，建议使用 Rollup.js 进行打包。参考文档：<https://www.rollupjs.com/>。

1. 安装

   ```bash
   npm i -g rollup
   ```

2. 在项目根目录下创建`rollup.config.js`文件

   ```js
   // rollup.config.js
   export default {
     input: "src/main.js", // 入口文件
     output: {
       file: "/lib/index.js", // 输出文件名
       format: "umd", // 输出文件类型：cjs,amd,umd,esm,iife
       name: "myUtils", // umd模式需要配置name属性，最终会挂载到window上。
     },
   };
   ```

3. 编写逻辑代码。

4. 执行编译命令

   ```bash
   rollup -c
   ```

   `-c`代表执行 rollup.config.js 文件中的配置信息。

5. 修改 package.json。

   因为编译输出的文件为`/lib/index.js`，所以需要把 package.json 文件的`main`字段值改为`"/lib/index.js"`。

6. 执行`npm publish`发布包。

### 3. Webpack

如果 rollup 不能满足需求，比如代码拆分、静态资源处理等，可以使用 webpack 代替。

参考文档：<https://webpack.docschina.org/>

1. 安装

   ```bash
   npm install webpack webpack-cli --save-dev
   ```

2. 创建配置文件`webpack.config.js`

   ```js
   const path = require("path");

   module.exports = {
     entry: "./src/index.js",
     output: {
       filename: "index.bundle.js",
       path: path.resolve(__dirname, "lib"),
     },
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: ["style-loader", "css-loader"],
         },
       ],
     },
   };
   ```

3. 执行编译命令

   ```bash
   npx webpack
   ```

   webpack 默认执行`webpack.config.js`文件中的配置信息，如果执行其他配置文件，可通过`npx webpack --config webpack.dev.config.js`执行指定配置文件。

4. 执行后续发布流程。

### 4. Vue CLI 库模式

vue-cli 内置【应用】和【库】两种构建模式，具体参考文档：<https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93>

使用库模式进行代码编译之后，使用上述 NPM 发布流程进行包发布。注意 package.json 文件的 `main` 字段配置。

---

上述 NPM 包发布流程可以满足基础发布操作，但是有很多不便之处，例如：

- 版本更新时，需要手动修改 package.json 的`version`字段。
- 多个包协同开发时，互相依赖的包之间联调不方便。
- 等等。。。

## Lerna 包管理

Lerna 是一个包管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。它可以解决刚才提到的包发布问题。

文档地址：<https://lernajs.bootcss.com/>

1. 安装

   ```bash
   npm install lerna -g
   ```

2. 创建一个目录，并进入。

3. 初始化

   ```bash
   lerna init
   ```

4. 编写逻辑代码。
5. 发布 npm 包

   ```bash
   lerna publish
   ```

`lerna publish`会自动更新相关 package 的版本号，无需手动更改。并且会自动 push 代码到远程仓库。

Lerna 的详细使用参考 [Lerna 的使用](/blogs/tools/lerna.html)
