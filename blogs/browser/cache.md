---
title: 前端缓存
date: 2021-01-04
tags:
  - 浏览器
  - Cache
categories:
  - 浏览器
---

## 介绍

前端缓存、HTTP 缓存、内存缓存、强缓存、协商缓存、Cache-Control、ETag 等等，这些都是啥，有什么关系和区别？一脸懵逼。。

那就从浏览器打开一个网页说起吧。

当浏览器请求资源时，会按照下列顺序读取：

1. Service Worker
2. Memory Cache
3. Disk Cache
4. 网络请求

### 1. Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker 的话，传输协议必须为 HTTPS。Service Worker 目前使用的不多，暂时不详细研究。参考 [Service Worker API - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 。

### 2. Memory Cache

Memory Cache 也就是内存中的缓存。几乎所有的网络请求资源都会被浏览器自动加入到 Memory Cache 中，但是 Memory Cache 容量有限并且持续性很短，会随着进程的释放而释放。一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。

内存缓存不受 max-age 、no-cache 等配置的影响，即使我们不设置缓存，如果当前的内存空间比较充裕的话，一些资源还是会被缓存下来。如果确定要禁用内存缓存，需要设置 no-store。

### 3. Disk Cache

Disk Cache 也就是存储在磁盘中的缓存，读取速度比 Memory Cache 慢，但是容量大，持久性存储。而且它允许相同的资源在跨会话，甚至跨站点的情况下使用，例如两个站点都使用了同一张图片。

磁盘缓存会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。绝大部分的缓存都来自 Disk Cache。

什么情况下会优先使用 Disk Cache 呢？

1. 大文件。
2. 内存使用率过高，文件优先存储进磁盘。

### 4. 网络请求

当以上缓存都没有命中的时候，就需要发起网络请求获取资源。

获取到资源后根据具体缓存策略添加到缓存中，以便提升下次请求速度。

![image](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuh1bcXNq238J3vRKyXya05vicp2ia1Dibe1B58wIbPAWpw4LC73HJ2rHibF6x9nHHQCSdsMgSqCkicg2Ew/640?wx_fmt=png)

前端开发过程中常说的缓存其实就是属于 Disk Cache，也称为 HTTP Cache。

接下来就详细研究一下 Disk Cache 吧。

## Disk Cache（HTTP Cache）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f28d28a86c294a379a6f55d18a8bfb50~tplv-k3u1fbpfcp-watermark.image)

HTTP 缓存分为两种：强缓存和协商缓存。通过设置 HTTP Header 来实现。

### 强缓存

不会向服务器发送请求，直接从缓存中读取资源。在 Chrome 浏览器控制台的 Network 选项中可以看到该请求返回 200 的状态码，并且 Size 显示 `from disk cache` 或 `from memory cache`。强缓存可以通过设置两种 HTTP Header 实现：`Expires` 和 `Cache-Control`。

#### 1. Expires

缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。响应时间在该时间之后的话，被认为缓存失效，需要重新获取资源。
示例：`Expires: Sun, 08 Nov 2021 03:37:26 GMT`

#### 2. Cache-Control

浏览器缓存最重要的设置，它会覆盖其他参数设置。参考 [Cache-Control - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)。

#### Expires VS Cache-Control

Expires 是 http1.0 的产物，Cache-Control 是 http1.1 的产物，两者同时存在的话，Cache-Control 优先级高于 Expires；在某些不支持 HTTP1.1 的环境下，Expires 就会发挥用处。所以 Expires 其实是过时的产物，现阶段它的存在只是一种兼容性的写法。

强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，那我们如何获知服务器端内容是否已经发生了更新呢？此时我们需要用到协商缓存策略。

### 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b524ad91318241c291c70248a1c2d567~tplv-k3u1fbpfcp-zoom-1.image)

主要有以下两种情况：

1. 协商缓存生效，返回 304 和 Not Modified。

![image](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuh1bcXNq238J3vRKyXya05vwhTKricFIZ7DDm791A8Xle82nfhcvNZoXQpLlAhLDwYdnRvXzUicBO8w/640?wx_fmt=png)

2. 协商缓存失效，返回 200 和请求结果。

![image](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuh1bcXNq238J3vRKyXya05vicp2ia1Dibe1B58wIbPAWpw4LC73HJ2rHibF6x9nHHQCSdsMgSqCkicg2Ew/640?wx_fmt=png)

协商缓存可以通过设置两种 HTTP Header 实现：

1. Last-Modified
2. ETag

#### 1. Last-Modified 和 If-Modified-Since

浏览器在第一次访问资源时，服务器返回资源的同时，在 response header 中添加 `Last-Modified` 的 header，值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和 header。

浏览器下一次请求这个资源，浏览器检测到有 `Last-Modified`这个 header，于是添加 `If-Modified-Since` 这个 header，值就是`Last-Modified`中的值；服务器再次收到这个资源请求，会根据 `If-Modified-Since` 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回 304 和空的响应体，直接从缓存读取。如果`If-Modified-Since`的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和 200。

但是 Last-Modified 存在一些弊端：

- 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源。
- 因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源。

既然根据文件修改时间来决定是否缓存尚有不足，能否可以直接根据文件内容是否修改来决定缓存策略？所以在 HTTP / 1.1 出现了 ETag 和 If-None-Match。

#### 2. ETag 和 If-None-Match

`Etag`是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，`Etag`就会重新生成。

浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的`Etag`值放到 request header 里的`If-None-Match`里，服务器只需要比较客户端传来的`If-None-Match`跟自己服务器上该资源的`ETag`是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现`ETag`匹配不上，那么直接以常规 GET 200 回包形式将新的资源（当然也包括了新的 ETag）发给客户端；如果`ETag`是一致的，则直接返回 304 知会客户端直接使用本地缓存即可。

![image](https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuh1bcXNq238J3vRKyXya05vprEFYicxgv0GWsJbPZoSv1bNg3PL1llN2jeLoaqZQcCsu9W3vKHoLzQ/640?wx_fmt=png)

#### Last-Modified VS ETag

- 在精确度上，`Etag`要优于`Last-Modified`。

  `Last-Modified`的时间单位是秒，如果某个文件在 1 秒内改变了多次，那么他们的`Last-Modified`其实并没有体现出来修改，但是`Etag`每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的`Last-Modified`也有可能不一致。

- 在性能上，`Etag`要逊于`Last-Modified`，毕竟`Last-Modified`只需要记录时间，而`Etag`需要服务器通过算法来计算出一个 hash 值。
- 在优先级上，服务器校验优先考虑`Etag`。

强制缓存优先于协商缓存进行，若强制缓存(`Expires`和`Cache-Control`)生效则直接使用缓存，若不生效则进行协商缓存(`Last-Modified` / `If-Modified-Since`和`Etag` / `If-None-Match`)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回 200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回 304，继续使用缓存。

:::warning
如果什么缓存策略都没设置，那么浏览器会怎么处理？

对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。
:::

## 实际场景中缓存最佳实践

1. index.html 不做缓存，每次请求都获取最新版本。
2. js、css 和图片等资源文件做强缓存处理（可以设置一个月、或者一年）。使用 Webpack 等前端构建工具，对资源文件名增加 hash 处理。

:::warning
为什么不给 index.html 做强缓存？

因为现在大部分系统都是单页面应用，index.html 是所有资源的入口，如果 index.html 被强缓存，那么就无法获取最新的资源文件，导致整个系统无法正常更新。
:::

:::warning
为什么其他资源文件就可以设置强缓存？

因为其他资源经过前端构建工具打包之后，生成的文件名都带有特殊的 hash 值。每次重新 build 都会生成一批新的带有 hash 值的资源文件名。例如：index.de62f314.js。

当部署新的前端项目文件到服务器后，浏览器请求 index.html 后发现相关的资源文件名称都发生了变化，就会重新请求新的资源。
:::

## 如何设置缓存

### 在 html 中设置 meta 信息

```html
<meta http-equiv="Cache-Control" content="max-age=31536000" />
```

### 在服务端设置响应头

```js
res.setHeader("Cache-Control", "public, max-age=31536000");
```

## 如何禁用缓存

### 在 html 中设置 meta 信息

```html
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
```

## 用户行为对浏览器缓存的影响

所谓用户行为对浏览器缓存的影响，指的就是用户在浏览器如何操作时，会触发怎样的缓存策略。主要有 3 种：

- 打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。

- 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。

- 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 `Cache-control:no-cache`(为了兼容，还带了 `Pragma:no-cache`),服务器直接返回 200 和最新内容。
