---
title: JS 中的堆栈
date: 2021-08-22
tags:
  - JavaScript
  - 堆栈
  - 变量提升
categories:
  - JavaScript
---

JavaScript 中数据类型分为两类：原始类型(基本类型)、引用类型(复合类型)。具体参考 [JavaScript 中的数据类型](/blogs/javascript/data-type.html)。

## 栈内存

- 存放原始类型数据
- 提供 JS 代码执行环境
- 先进后出

JS 代码执行的时候会按顺序进栈执行，执行完毕后出栈。注意，全局上下文的出栈只有页面关闭的时候才会进行。

## 堆内存

- 存放引用类型数据，比如数组、对象、方法等。
