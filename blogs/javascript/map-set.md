---
title: JS 中的Map、Set
date: 2019-07-20
tags:
  - JavaScript
  - Map
  - Set
categories:
  - JavaScript
---

## Map

JavaScript 的默认对象表示方式为`{}`，即一组键值对。但是键名必须是字符串。但实际上 Number 或者其他数据类型作为键也是非常合理的。为了解决这个问题，ES6 规范引入了新的数据类型`Map`。

- 一个 Object 的键名只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
- Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
- Map 的键名是唯一的，不会重复。Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

### 方法

- `set(key, value)`，设置值。
- `get(key)`，获取值。
- `delete(key)`，删除值。
- `clear()`，移除所有键值对。
- `has(key)`，判断是否存在键对应的值。
- `keys()`，返回 Map 对象中所有的键名。
- `values()`，返回 Map 对象中所有的键值。
- `entries()`，返回 Map 对象中每个元素的 `[key, value]` 数组。
- `forEach(callbackFn)`，按插入顺序，为 Map 对象里的每一键值对调用一次 callbackFn 函数

### 属性

- `size`，获得 Map 对象中条目数量。

### 初始化一个空的 Map

```js
const map = new Map(); // => Map(0) {}

map.set("b", 20); // => Map(1) {"b" => 20}
map.set("a", 10); // => Map(2) {"b" => 20, "a" => 10}
map.set("c", 30); // => Map(3) {"b" => 20, "a" => 10, "c" => 30}
map.set("c", 40); // => Map(3) {"b" => 20, "a" => 10, "c" => 40}
```

可以看出 Map 不会像 Object 一样根据字母顺序排列，而是根据添加的顺序排列。并且如果键名重复，后面添加的值会覆盖之前添加的值。

### 数组转 Map

被转换的数组需要是二维数组

```js
const arr = [
  ["a", 10],
  ["b", 20],
  ["c", 30],
];
const map = new Map(arr); // => Map(3) {"a" => 10, "b" => 20, "c" => 30}
```

### Map 转数组

1. 使用`Array.from`进行转换

```js
const map = new Map(); // => Map(0) {}
map
  .set("a", 10)
  .set("b", 20)
  .set("c", 30); // => Map(3) {"a" => 10, "b" => 20, "c" => 30}
const arrFromMap = Array.from(map); // => [['a',10], ['b',20], ['c',30]]
```

2. 使用`...`进行转换

```js
const map = new Map(); // => Map(0) {}
map
  .set("a", 10)
  .set("b", 20)
  .set("c", 30); // => Map(3) {"a" => 10, "b" => 20, "c" => 30}
const arrFromMap = [...map]; // => [['a',10], ['b',20], ['c',30]]
```

### Map 转对象

```js
const map = new Map(); // => Map(0) {}
map
  .set("a", 10)
  .set("b", 20)
  .set("c", 30); // => Map(3) {"a" => 10, "b" => 20, "c" => 30}
const objFromMap = Object.fromEntries(map); // => {a: 10, b: 20, c: 30}
```

### Map 遍历

1. forEach

```js
const map = new Map(); // => Map(0) {}
map
  .set("a", 10)
  .set("b", 20)
  .set("c", 30); // => Map(3) {"a" => 10, "b" => 20, "c" => 30}
// 第一个参数是value，第二个参数是key。
map.forEach((value, key) => {
  // => 10 'a'
  // => 20 'b'
  // => 30 'c'
});
```

2. for...of

```js
const map = new Map(); // => Map(0) {}
map
  .set("a", 10)
  .set("b", 20)
  .set("c", 30); // => Map(3) {"a" => 10, "b" => 20, "c" => 30}
// 第一个参数是key，第二个参数是value。
for (const [key, value] of map) {
  // => 'a' 10
  // => 'b' 20
  // => 'c' 30
}
```

## Set

Map 是键值对的集合，而 Set 是值的集合。可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

### 方法

- `add(value)`，设置值。
- `delete(value)`，删除值。
- `clear()`，移除所有值。
- `has(value)`，判断是否存在该值。
- `keys()`，返回 Set 对象中所有的值。
- `values()`，返回 Set 对象中所有的值。
- `entries()`，返回 Set 对象中每个元素的 `[value, value]` 数组。
- `forEach(callbackFn)`，按插入顺序，为 Set 对象里的每个值调用一次 callbackFn 函数

### 属性

- `size`，获得 Set 对象中值的个数。

### 初始化一个空的 Set

```js
const set = new Set(); // => Set(0) {}

set.add(20); // => Set(1) {20}
set.add(10); // => Set(2) {20, 10}
set.add(30); // => Set(3) {20, 10, 30}
set.add(30); // => Set(4) {20, 10, 30}
```

可以看出，如果添加重复的元素，Set 只有保留一个。

### 数组转 Set

```js
const arr = [10, 20, 30];
const set = new Set(arr); // => Set(3) {10, 20, 30}
```

### Set 转数组

1. 使用`Array.from`进行转换

```js
const set = new Set(); // => Set(0) {}
set
  .add(10)
  .add(20)
  .add(30); // => Set(3) {10, 20, 30}
const arrFromSet = Array.from(set); // => [10, 20, 30]
```

2. 使用`...`进行转换

```js
const set = new Set(); // => Set(0) {}
set
  .add(10)
  .add(20)
  .add(30); // => Set(3) {10, 20, 30}
const arrFromSet = [...set]; // => [10, 20, 30]
```

> 可以使用 Set 对一维数组进行去重处理

```js
const numbers = [2, 3, 4, 4, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 5, 32, 3, 4, 5];
const output = [...new Set(numbers)]; // => [2, 3, 4, 5, 6, 7, 32]
```

### Set 遍历

1. forEach

```js
const set = new Set(); // => Set(0) {}
set
  .add(10)
  .add(20)
  .add(30); // => Set(3) {10, 20, 30}
set.forEach((value) => {
  // => 10
  // => 20
  // => 30
});
```

2. for...of

```js
const set = new Set(); // => Set(0) {}
set
  .add(10)
  .add(20)
  .add(30); // => Set(3) {10, 20, 30}
for (const value of set) {
  // => 10
  // => 20
  // => 30
}
```

## WeakMap

WeakMap 只接受对象作为键名，键值可以是任何类型。其中键名是弱引用的，在没有其他引用存在时，会被垃圾回收机制自动回收。  
WeakMap 不支持遍历，没有`size`属性。只有`set`、`get`、`has`、`delete`四个方法。

## WeakSet

WeakSet 只接受对象作为值，且都是以弱引用的方式存储。如果没有其他的对 WeakSet 中对象的引用，那么这些对象会被当成垃圾回收掉。
WeakSet 不支持遍历，没有`size`属性。只有`add`、`has`、`delete`三个方法。

参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
