---
title: 如何开发一个NPM包
date: 2021-08-13
tags:
 - NPM
categories:
 -  NPM
---


## 前端模块化概念

### CommonJS  
  - CommonJS是服务端模块的规范，在NodeJS中使用。一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性。
  - 输出模块使用`module.exports`。
  - 加载模块使用`require()`。  
  
### AMD  
  全称`Asynchronous Module Definition`，异步模块规范。
  - CommonJS是同步加载，无法满足浏览器使用场景。AMD是RequireJS的模块化规范，支持异步。
  - 定义模块`define(id?, dependencies?, factory);`
  - 加载模块`require([dependencies], function(){});`
  - AMD推崇依赖前置，在定义模块的时候就声明其依赖的模块。
  - AMD在加载模块后就会立即执行，所有模块都加载执行完成后，进入require回调函数、执行主逻辑。依赖模块加载顺序不一定与书写顺序保持一致，哪个先下载完成就先执行哪个，但是主逻辑一定在所有模块之后执行。

### CMD  
  全称`Common Module Definition`。
  - CMD也支持异步，是SeaJS的模块化规范。
  - CMD推崇就近依赖，只有在用到某个模块的时候再去require。
  - CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的。

### UMD
  全称`Universal Module Definition`，通用模块规范。
  UMD将CommonJS、AMD、CMD等兼容处理
  ```
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

参考文档：[https://zhuanlan.zhihu.com/p/41568986](https://zhuanlan.zhihu.com/p/41568986)  


## 准备
1. 注册NPM账号。https://www.npmjs.com/
2. 本地登录npm账号。`npm login` 

## 实现方案
### 1. NPM
1. 创建一个空文件夹并进入，初始化package.json文件。
    ```
    npm init
    ```
2. 查看当前npm账号。
    ```
    npm whoami
    ```
3. 发布
    ```
    npm publish
    ```
    执行`npm view xxx`可以查看当前npm包发布信息。 
    
==【注】== npm包命名时，为避免重名或者相似度过高导致引用错误，可以以`@私有空间名/包名`的格式设置包名。  
```
{
    "name": "@lee/utils"
}
```
该格式的包被默认为私有的，所有在发布时需要添加`--access=public`将其变为公有的包。
```
npm publish --access=publish
```

### 2. Rollup
有时候需要对JS代码进行编译打包后再进行发布，如果是纯JS工具函数库，建议使用Rollup.js进行打包。参考文档：[https://www.rollupjs.com/](https://www.rollupjs.com/)  
1. 安装
```
npm i -g rollup
```
2. 在项目根目录下创建`rollup.config.js`文件
```
// rollup.config.js
export default{
    input: "src/main.js", // 入口文件
    output: {
        file: "/lib/index.js", // 输出文件名 
        format: "umd", // 输出文件类型：cjs,amd,umd,esm,iife
        name: "myUtils" // umd模式需要配置name属性，最终会挂载到window上。
    }
}
```
3. 执行编译命令
```
rollup -c 
```
`-c`代表执行rollup.config.js文件中的配置信息。

### 3. Webpack
如果rollup不能满足需求，比如代码拆分、静态资源处理等，可以使用webpack代替。参考文档：[https://webpack.docschina.org/](https://webpack.docschina.org/)  
1. 安装
```
npm install webpack webpack-cli --save-dev
```
2. 创建配置文件`webpack.config.js`
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'lib'),
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
```
npx webpack
```
webpack默认执行`webpack.config.js`文件中的配置信息，如果执行其他配置文件，可通过`npx webpack --config webpack.dev.config.js`执行指定配置文件。

### 4. Vue CLI 库模式
vue-cli内置【应用】和【库】两种构建模式，参考文档：[https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93)  
1. 创建项目
```
vue create myPackages
```
2. 执行编译命令
```
vue-cli-service build --target lib --name myLib [entry]
```

## Lerna 包管理
Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。文档地址：[https://lernajs.bootcss.com/](https://lernajs.bootcss.com/)  
1. 安装
```
npm install lerna -g
```
2. 初始化
```
lerna init
```
3. 发布npm包
```
lerna publish
```
`lerna publish`会自动更新相关package的版本号，无需手动更改。并且会自动push代码到远程仓库。

### 发布模式

#### 统一模式
所有的NPM包版本都以 lerna.json 中的 version 字段为准，一致更新。
```js
// lerna.json
{
    ...
    "version": "1.0.0",
    ...
}
```

#### 独立模式
每个NPM包根据各自的 package.json 版本号进行更新，互不影响。
```js
// lerna.json
{
    ...
    "version": "independent",
    ...
}
```
