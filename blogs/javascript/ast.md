---
title: JS 抽象语法树(AST)
date: 2021-08-24
tags:
  - JavaScript
  - AST
  - 变量提升
categories:
  - JavaScript
---

JS 代码由接

## 什么是抽象语法树

抽象语法树（Abstract Syntax Tree，AST），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

说人话就是，把便于人类识别的程序代码转换成便于计算机识别某种树状结构。

## AST 有什么作用

- IDE 的错误提示、代码格式化、代码高亮、代码自动补全等。
- webpack、rollup 进行代码打包。
- Babel 将 TypeScript、JSX 等转化为原生 Javascript。
- 代码优化。
- ......

## 如何生成 AST

AST 的生成经历两个阶段：

1. 词法分析

   将整个代码字符串分割成最小语法单元数组，称之为 Tokens 列表。

   Javascript 代码中的语法单元：

   - 关键字：例如 var、let、const 等。
   - 标识符：没有被引号括起来的连续字符，可能是一个变量，也可能是 if、else 这些关键字，又或者是 true、false 这些内置常量。
   - 运算符： +、-、 \*、/ 等
   - 数字：像十六进制，十进制，八进制以及科学表达式等语法。
   - 字符串：因为对计算机而言，字符串的内容会参与计算或显示。
   - 空格：连续的空格，换行，缩进等。
   - 注释：行注释或块注释都是一个不可拆分的最小语法单元。
   - 其他：大括号、小括号、分号、冒号等。

2. 语法分析

   将词法分析出来的 Tokens 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。

例如：

```js
var a = 0;
```

经过词法分析转换成 Tokens 列表。

```json
// 简化版
[
  {
    "type": "Keyword",
    "value": "var"
  },
  {
    "type": "Identifier",
    "value": "a"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "Numeric",
    "value": "0"
  },
  {
    "type": "Punctuator",
    "value": ";"
  }
]
```

经过语法分析将 Tokens 列表转换为 AST

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": 0,
            "raw": "0"
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "script"
}
```

生成 AST 的同时，JS 引擎将 var 变量声明和函数声明等放到执行上下文的变量环境中（作用域）。**变量提升**就发生在这个阶段。

生成了作用域和 AST 之后，JS 引擎的**解释器 Ignition**依据它们来生成字节码。

## V8 引擎

---

## AST 节点介绍

- [https://www.jianshu.com/p/4f27f4aa576f](https://www.jianshu.com/p/4f27f4aa576f)
- [GitHub AST Node](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)
- [词法文法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar)

## AST 在线转换工具

- [Esprima](https://esprima.org/demo/parse.html)
- [Ast Explorer](https://astexplorer.net/)

## AST 工具库

- [recast](https://github.com/benjamn/recast)
