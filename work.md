### 从一个git仓库转移到另一个git仓库

- 原仓库克隆一份到本地 
```
git clone --bare git://github.com/username/project.git
```
- 在git 上新建一个仓库 newProject.git
- 进入原仓库文件 
```
cd project
git push --mirror  git://github.com/username/newProject.git
```
##### --mirror 克隆出来的裸版本对上游版本库进行了注册，这样可以在裸版本库中使用git fetch命令和上游版本库进行持续同步。
- 删除本地代码
```
rm -rf project
```
-  直接clone 新git仓库即可
```
git clone  git://github.com/username/newProject.git
```
#### 删除远程分支
```
git push origin --delete 分支名
```

#### 非顺序数据结构 
- 散列表
- 树