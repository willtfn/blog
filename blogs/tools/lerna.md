---
title: Lerna的使用
description: JavaScript的包管理工具
date: 2020-10-11
tags:
  - Lerna
categories:
  - 工具
---

## 发布模式

### 统一模式

所有的 NPM 包版本都以 lerna.json 中的 version 字段为准，一致更新。

```json
// lerna.json
{
    ...
    "version": "1.0.0",
    ...
}
```

### 独立模式

每个 NPM 包根据各自的 package.json 版本号进行更新，互不影响。

```json
// lerna.json
{
    ...
    "version": "independent",
    ...
}
```
