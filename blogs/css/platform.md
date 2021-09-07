---
title: 页面自适应
date: 2021-09-07
tags:
  - CSS
categories:
  - CSS
---

## 各设备尺寸

```css
/* 【PC浏览器】，页面可视宽度 > 1200px */
@media screen and (min-width: 1200px) {
}

/* 【iPad Pro】，960px < 页面可视宽度 < 1199px */
@media screen and(min-width: 960px) and (max-width: 1199px) {
}

/* 【iPad】，768px < 页面可视宽度 < 959px */
@media screen and(min-width: 768px) and (max-width: 959px) {
}

/* 【特殊设备】，480px < 页面可视宽度 < 767px */
@media screen and(min-width: 480px) and (max-width: 767px) {
}

/* 【手机】，页面可视宽度 < 479px */
@media screen and (max-width: 479px) {
}

/* 横屏 */
@media only screen and (orientation: landscape) {
}

/* 竖屏 */
@media only screen and (orientation: portrait) {
}
```
