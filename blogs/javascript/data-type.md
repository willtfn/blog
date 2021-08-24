---
title: JS 中的数据类型
date: 2018-07-14
tags:
  - JavaScript
categories:
  - JavaScript
---

## 数据类型

最新的 ECMAScript 标准定义了 8 种数据类型：

- 七种基本类型：
  - boolean
  - string
  - number
  - null
  - undefined
  - symbol （ES2015）
  - bigint （ES2020）
- Object 复合类型
  - Array
  - Function
  - Date
  - RegExp
  - Map
  - Set
  - ...

## 如何判断数据类型

### typeof

- `typeof true` => `"boolean"`
- `typeof 'abc'` => `"string"`
- `typeof 123` => `"number"`
- `typeof null` => `"object"`
- `typeof undefined` => `"undefined"`
- `typeof Symbol()` => `"symbol"`
- `typeof BigInt(1)` => `"bigint"`
- `typeof new Object()` => `"object"`
- `typeof new Date()` => `"object"`
- `typeof new Function()` => `"function"`

### instance of

instanceof 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

### Object.prototype.toString.call()

- `Object.prototype.toString.call(true)` => `"[object Boolean]"`
- `Object.prototype.toString.call('abc')` => `"[object String]"`
- `Object.prototype.toString.call(123)` => `"[object Number]"`
- `Object.prototype.toString.call(null)` => `"[object Null]"`
- `Object.prototype.toString.call(undefined)` => `"[object Undefined]"`
- `Object.prototype.toString.call(Symbol())` => `"[object Symbol]"`
- `Object.prototype.toString.call(BigInt(1))` => `"[object BigInt]"`
- `Object.prototype.toString.call(new Object())` => `"[object Object]"`
- `Object.prototype.toString.call(new Date())` => `"[object Date]"`
