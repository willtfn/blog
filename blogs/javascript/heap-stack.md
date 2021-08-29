---
title: JS 堆栈
date: 2021-08-22
tags:
  - JavaScript
  - 堆栈
categories:
  - JavaScript
---

## 栈（Stack）

栈是计算机中的一种数据结构，像杯子一样，只有一个开口。具有**先进后出**的特点。

<img src="./images/heap_stack_01.png" style="max-width:400px;"/>

**入栈顺序：** a -> b -> c -> d -> e -> f

**出栈顺序：** f -> e -> d -> c -> b -> a

### 栈的作用

- 存放原始类型数据

  JS 中[数据类型](/blogs/javascript/data-type.html)分为两类：原始类型(基本类型)、引用类型(复合类型)。原始类型存储在栈内存，引用类型存储在堆内存。

- 提供 JS 代码执行环境

  JS 代码执行的时候会按顺序进栈执行，执行完毕后出栈。

  :::warning
  注意，全局上下文的出栈只有页面关闭的时候才会进行。
  :::

## 堆（Heap）

堆内存存放引用类型数据，比如数组、对象、方法等。存储的数据大小一般都是未知的，在运行时才进行内存分配。

<img src="./images/heap_stack_02.png" style="max-width:300px;"/>

了解堆栈的概念之后，开始步入 JS 代码执行正题。 👉 [JS 执行上下文](/blogs/javascript/execution-context.html)

---

参考：

- [JS 内存模型](https://www.cnblogs.com/fayin/p/10763689.html)
