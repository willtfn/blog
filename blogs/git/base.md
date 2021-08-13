---
title: Git基础知识
date: 2019-05-10
tags:
  - Git
categories:
  - Git
---

## 创建并添加 SSH Key 到 GitHub 代码仓库

在使用 SSH 格式进行代码提交时，需要先在代码仓库绑定对应设备的 SSH Key，否则会提示没有权限进行代码提交操作。

### Mac 设备

1. 生成本机 SSH Key。

   ```bash
   ssh-keygen -t rsa -C "xxx@163.com"
   ```

   执行上述命令之后，会在`~/.ssh/`目录下生成`id_rsa.pub`文件。

2. 复制 SSH Key
   执行 `cat ~/.ssh/id_rsa.pub`命令，查看当前 SSH Key，并复制。

3. 设置 SSH Key
   登录 GitHub 网站，进入设置页面，选择`SSH and GPG keys`模块，点击`New SSH Key`，输入自定义 Title，并且粘贴 SSH Key，点击保存。

设置成功之后就可以正常提交代码了。
