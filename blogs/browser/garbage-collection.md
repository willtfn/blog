---
title: 浏览器垃圾回收机制
date: 2021-08-20
tags:
  - 浏览器
  - 垃圾回收
categories:
  - 浏览器
---

**什么是垃圾回收？**

JavaScript 中数据类型分为两类：原始类型、引用类型。具体参考 [JavaScript 中的数据类型](/blogs/javascript/data-type.html)。

原始类型数据存放在栈中，引用类型数据存放在堆中。
