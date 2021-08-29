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

### Tokens 列表

前面的 [示例代码](/blogs/javascript/V8.html#示例代码) 经过词法分析转换成 Tokens 列表。

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
    "value": "1"
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Keyword",
    "value": "var"
  },
  {
    "type": "Identifier",
    "value": "b"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "Identifier",
    "value": "a"
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Keyword",
    "value": "function"
  },
  {
    "type": "Identifier",
    "value": "fun1"
  },
  {
    "type": "Punctuator",
    "value": "("
  },
  {
    "type": "Punctuator",
    "value": ")"
  },
  {
    "type": "Punctuator",
    "value": "{"
  },
  {
    "type": "Keyword",
    "value": "var"
  },
  {
    "type": "Identifier",
    "value": "fun1_a"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "String",
    "value": "\"fa\""
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Keyword",
    "value": "return"
  },
  {
    "type": "Punctuator",
    "value": "{"
  },
  {
    "type": "Identifier",
    "value": "getA"
  },
  {
    "type": "Punctuator",
    "value": ":"
  },
  {
    "type": "Keyword",
    "value": "function"
  },
  {
    "type": "Punctuator",
    "value": "("
  },
  {
    "type": "Punctuator",
    "value": ")"
  },
  {
    "type": "Punctuator",
    "value": "{"
  },
  {
    "type": "Keyword",
    "value": "return"
  },
  {
    "type": "Identifier",
    "value": "fun1_a"
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Punctuator",
    "value": "}"
  },
  {
    "type": "Punctuator",
    "value": ","
  },
  {
    "type": "Identifier",
    "value": "setA"
  },
  {
    "type": "Punctuator",
    "value": ":"
  },
  {
    "type": "Keyword",
    "value": "function"
  },
  {
    "type": "Punctuator",
    "value": "("
  },
  {
    "type": "Identifier",
    "value": "val"
  },
  {
    "type": "Punctuator",
    "value": ")"
  },
  {
    "type": "Punctuator",
    "value": "{"
  },
  {
    "type": "Identifier",
    "value": "fun1_a"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "Identifier",
    "value": "val"
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Punctuator",
    "value": "}"
  },
  {
    "type": "Punctuator",
    "value": ","
  },
  {
    "type": "Punctuator",
    "value": "}"
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Punctuator",
    "value": "}"
  },
  {
    "type": "Identifier",
    "value": "fun1"
  },
  {
    "type": "Punctuator",
    "value": "("
  },
  {
    "type": "Punctuator",
    "value": ")"
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Keyword",
    "value": "function"
  },
  {
    "type": "Identifier",
    "value": "fun2"
  },
  {
    "type": "Punctuator",
    "value": "("
  },
  {
    "type": "Punctuator",
    "value": ")"
  },
  {
    "type": "Punctuator",
    "value": "{"
  },
  {
    "type": "Punctuator",
    "value": "}"
  },
  {
    "type": "Keyword",
    "value": "var"
  },
  {
    "type": "Identifier",
    "value": "fun2"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "String",
    "value": "\"c\""
  },
  {
    "type": "Punctuator",
    "value": ";"
  },
  {
    "type": "Identifier",
    "value": "console"
  },
  {
    "type": "Punctuator",
    "value": "."
  },
  {
    "type": "Identifier",
    "value": "log"
  },
  {
    "type": "Punctuator",
    "value": "("
  },
  {
    "type": "String",
    "value": "\"fun2\""
  },
  {
    "type": "Punctuator",
    "value": ","
  },
  {
    "type": "Identifier",
    "value": "fun2"
  },
  {
    "type": "Punctuator",
    "value": ")"
  },
  {
    "type": "Punctuator",
    "value": ";"
  }
]
```

### AST

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
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "b"
          },
          "init": {
            "type": "Identifier",
            "name": "a"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "fun1"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "fun1_a"
                },
                "init": {
                  "type": "Literal",
                  "value": "fa",
                  "raw": "\"fa\""
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "ObjectExpression",
              "properties": [
                {
                  "type": "Property",
                  "key": {
                    "type": "Identifier",
                    "name": "getA"
                  },
                  "computed": false,
                  "value": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "body": [
                        {
                          "type": "ReturnStatement",
                          "argument": {
                            "type": "Identifier",
                            "name": "fun1_a"
                          }
                        }
                      ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                  },
                  "kind": "init",
                  "method": false,
                  "shorthand": false
                },
                {
                  "type": "Property",
                  "key": {
                    "type": "Identifier",
                    "name": "setA"
                  },
                  "computed": false,
                  "value": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [
                      {
                        "type": "Identifier",
                        "name": "val"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                              "type": "Identifier",
                              "name": "fun1_a"
                            },
                            "right": {
                              "type": "Identifier",
                              "name": "val"
                            }
                          }
                        }
                      ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                  },
                  "kind": "init",
                  "method": false,
                  "shorthand": false
                }
              ]
            }
          }
        ]
      },
      "generator": false,
      "expression": false,
      "async": false
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "fun1"
        },
        "arguments": []
      }
    },
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "fun2"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "body": []
      },
      "generator": false,
      "expression": false,
      "async": false
    },
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "fun2"
          },
          "init": {
            "type": "Literal",
            "value": "c",
            "raw": "\"c\""
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "name": "log"
          }
        },
        "arguments": [
          {
            "type": "Literal",
            "value": "fun2",
            "raw": "\"fun2\""
          },
          {
            "type": "Identifier",
            "name": "fun2"
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}
```

生成 AST 的同时，JS 引擎将 var 变量声明和函数声明等放到[执行上下文](/blogs/javascript/execution-context.html)的变量对象中。**变量提升**就发生在这个阶段。

生成了作用域和 AST 之后，JS 引擎的**解释器 Ignition**依据它们来生成字节码，并且一边解释一边执行。

## 代码执行

众所周知，在 JS 执行之前，V8 引擎已经初始化好了堆栈空间、全局执行上下文、事件循环系统等等。

首先，什么是堆栈空间呢？ 👉 [JS 堆栈](/blogs/javascript/heap-stack.html)

---

## 相关资料

### AST 节点介绍

- [AST 节点介绍](https://www.jianshu.com/p/4f27f4aa576f)
- [GitHub AST Node](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)
- [词法文法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar)

### AST 在线转换工具

- [Esprima](https://esprima.org/demo/parse.html)
- [Ast Explorer](https://astexplorer.net/)

### AST 工具库

- [recast](https://github.com/benjamn/recast)
