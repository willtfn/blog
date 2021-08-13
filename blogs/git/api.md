---
title: Git常用命令
date: 2019-05-10
tags:
  - Git
categories:
  - Git
---

## 初始化仓库

```
git init
```

## 添加所有修改文件到暂存区

```
git add .
```

## 添加注释并将暂存区内容提交到当前本地分支

```
git commit -m "xxx"
```

## 查看当前分支文件修改状态

```
git status
```

## 拉取远程分支代码到本地

```
git pull origin master
```

## 本地分支代码推送到远程仓库

```
git push origin master
```

## 将远程仓库 clone 到本地

默认在当前路径下创建与远程仓库同名的目录

```
git clone git@github.com:leexiang59/easy-cli.git
```

## 将远程仓库 clone 到本地指定目录

```
git clone git@github.com:leexiang59/easy-cli.git newProject
```

## 创建本地分支 A

```
git branch A
```

## 切换到分支 A

```
git checkout A
```

或者

```
git switch A
```

## 创建并切换到本地分支 A

```
git checkout -b A
```

或者

```
git switch -c A
```

## 将分支 A 代码合并到当前分支

```
git merge A
```

## 将当前分支的 HEAD 指向 A 分支

```
git rebase A
```

## 删除本地分支

```
git branch -d xxx
```

## 删除远程分支

```
git push origin -d xxx
```

> 如果强行删除，参数 -d 修改为 -D

## 查看所有分支

```
git branch -a
```

## 重命名当前分支名称

```
git branch -m new_branch
```

## 重命名指定分支名称

```
git branch -m old_branch new_branch
```

## 合并指定提交记录中的内容到当前分支

```
git cherry-pick [commit_id]
```

## 储藏当前修内容

```
git stash
```

## 查看储藏列表

```
git stash list
```

## 释放最近一次储藏的内容

```
git stash pop
```

## 释放储藏列表中指定的内容

`n` 为列表的序号

```
git stash apply [n]
```

## 修改最近一次 commit 信息

```
git commit --amend
```

按`i`进入编辑模式  
修改完成后，按 `Esc` 退出编辑模式  
输入`:wq`，按回车键保存并退出  
重新 git push 代码到远程仓库

## 修改指定节点的 commit 信息

1. `git log` 查看提交历史。
2. 进入编辑界面，`git rebase -i HEAD~[n]`。
   > `n`为需要修改的节点的顺序，比如要修改当前 HEAD 之前的第 3 次 commit 信息，则执行`git rebase -i HEAD~3`，进入编辑界面。
3. 找到需要修改的那一条 commit，将`pick`改成`edit`。保存并退出。
4. 执行`git commit --amend`，修改 commit 信息。
5. 执行`git rebase --continue`，直到全部完成。

## 清空当前分支 commit 信息

```
git checkout --orphan  new_branch
git add .
git commit -m "xxx"
git branch -D master
git branch -m master
```

## 删除本地项目的远程仓库连接

```
git remote rm origin
```

## 查看当前远程仓库

```
git remote -v
```

## 添加本地项目与远程仓库的连接

```
git remote add origin git@github.com:leexiang59/l-helpers.git
```

## 关联后第一次推送代码到远程仓库

```
git push -u origin master
```

## 查看提交历史

```
git log // 查看所有提交历史
git log -3 // 查看近三次的提交历史
```

## 查看历史操作命令

```
git reflog
```

## 丢弃工作区文件修改

`[file]` 为文件名称

```
git checkout -- [file]
```

## 丢弃工作区所有文件修改

```
git checkout .
```

## 撤销暂存区文件修改

```
git reset HEAD [file]
```

## 撤销暂存区所有文件修改

```
git reset HEAD
```

## 回退到上一版本

```
git reset --hard HEAD^
```

## 回退到指定版本

```
git reset --hard [版本号]
```

---

参考：[史上最浅显易懂的 Git 教程！](https://www.liaoxuefeng.com/wiki/896043488029600)

工具：[Git 分支练习](https://learngitbranching.js.org/?locale=zh_CN)
