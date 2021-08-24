---
title: JS 中的var、let、const
date: 2018-07-14
tags:
  - JavaScript
  - const
categories:
  - JavaScript
---

## var

声明一个变量，并可选地将其初始化为一个值。

### 作用域

用 `var` 声明的变量的作用域是它当前的执行上下文，不使用 `var` 声明的变量会被隐式地创建为全局变量。

```js
function x() {
  y = 1; // 在严格模式（strict mode）下会抛出 ReferenceError 异常
  var z = 2;
  console.log(y); // => 1
  console.log(z); // => 2
}

x();

console.log(y); // => 1  y被声明为全局变量，因此可以在函数外部获取。
console.log(z); // 抛出 ReferenceError: z 未在 x 外部声明。z被声明为x()的局部变量，因此无法在函数外部获取。
```

### 变量提升

用 `var` 声明的变量在任何代码执行前创建，非声明变量只有在执行赋值操作的时候才会被创建。

```js
console.log(a); // => undefined
var a = 1;
console.log(a); // => 1
```

相当于

```js
var a;
console.log(a); // => undefined
a = 1;
console.log(a); // => 1
```

不使用 `var` 声明时：

```js
console.log(a); // => 抛出 ReferenceError: a 未声明
a = 1;
console.log(a); // => 1
```

## let

声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

### 作用域

`let` 声明的变量只在其声明的块或者子块中可用。

ES6 规定，在某个花括号对 `{ }` 的内部用 `let` 关键字生声明的变量和函数拥有块级作用域，这些变量和函数只能被花括号对 `{ }` 的内部的语句使用，外部不可访问。

ES6 规定，在块级作用域之中，函数声明语句的行为类似于 `let`，在块级作用域之外不可引用。但是这样的处理规则显然会对老代码产生很大的影响，出于向后（backward）兼容的考虑，在块级作用域中声明的函数依然可以在作用域外部引用。如果需要函数只在块级作用域中起作用，应该用 `let` 关键字写成函数表达式，而不是函数声明语句。

```js
function varTest() {
  var x = 1;
  {
    // 块级作用域，使用 var 声明时，不受块级作用域影响。
    var x = 2; // 同样的变量!
    console.log(x); // => 2
  }
  console.log(x); // => 2
}

function letTest() {
  let x = 1;
  {
    // 块级作用域，使用 let 声明时，变量只在作用域内可用。
    let x = 2; // 不同的变量
    console.log(x); // => 2
  }
  console.log(x); // => 1 , 不受块级作用域内的代码影响。
}
```

### 变量提升

`let` 声明的变量不存在变量提升。

```js
console.log(a); // => 抛出 ReferenceError: a 未声明
let a = 1;
console.log(a); // => 1
```

### 不能重复声明

在同一个函数或块作用域中重复声明同一个变量会引起 `SyntaxError`。

```js
function test() {
  let x = 1;
  let x = 2;
}

test(); // =>  SyntaxError: Identifier 'x' has already been declared
```

## const

`const` 用于声明常量，用法非常类似于 `let`。但是 `const` 声明的常量值无法修改，也无法被重新声明。
