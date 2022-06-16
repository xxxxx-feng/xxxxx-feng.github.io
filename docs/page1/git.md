一，代码提交

> **第一种方法：（常用）**
> 
> 1、git add .
（后面有一个点，意思是将你本地所有修改了的文件添加到暂存区）
> 
> 2、git commit -m""  
(引号里面是你的介绍，就是你的这次的提交是什么内容，便于你以后查看，这个是将索引的当前内容与描述更改的用户和日志消息一起存储在新的提交中)
> 
> 3、git pull --rebase
（这是下拉代码，将远程最新的代码先跟你本地的代码合并一下，如果确定远程没有更新，可以不用这个，最好是每次都执行以下，完成之后打开代码查看有没有冲突，并解决，如果有冲突解决完成以后再次执行1跟2的操作）
> 
> 4、git push
 （将代码推至远程就可以了）

> **第二种方法：（避免有冲突多次提交，高级用法）**
1、git stash
 （这是将本地代码回滚值至上一次提交的时候，就是没有你新改的代码）
2、git pull --rebase
（将远程的拉下来）
3、git stash pop
（将第一步回滚的代码释放出来，相等于将你修改的代码与下拉的代码合并）
 然后解决冲突，你本地的代码将会是最新的代码
4、git add .
5、git commit -m ""
6、git push

二，分支管理

> **本地新建分支同步到远端**
切换到某一分支，拉取一个新的本地分支
git checkout -b  分支名称
（创建分支并且切换到分支）
git  push -u origin 分支名称
（新创建的分支同步到远程仓库）

> **分支合并**
git branch (查看本地分支)
git checkout 分支名称
git pull --rebase(多人开发时)
git merge --no-ff 分支名称
（--no-off 禁止快进式合并,  --no-ff 会让 Git 生成一个新的提交对象。快进式合并会把 feature 的提交历史混入到 master 中，搅乱 master 的提交历史。）
合并出现冲突时需要解决冲突，然后重新提交   git push origin 分支名称

> **分支删除**
git remote update origin --prune 
（更新远程分支列表）
git push origin --delete Chapater6
（删除远程分支Chapater6）
git branch -d  Chapater6
（删除本地分支 Chapater6）
git fetch --prune origin 或者 git fetch -p
(获取被删减后的远程分支)

 三，版本回退

>  **git操作日志** 
 git log --decorate --graph --oneline --all #显示当前及之前的版本号 git
log --pretty=oneline #将版本历史显示为一行， 历史版本号全部显示 git log --pretty=oneline
--abbrev-commit #将版本历史显示为一行， 历史版本号部分显示 git log --graph #查看分支合并图

> 执行版本退回后，本地工作区的内容会自动和回退到的版本库版本的内容保持同步
git reset --hard HEAD^ 回退到上一个版本
git reset --hard HEAD^^ 回退到上上个版本，以此类推，一次提交即为一个版本
git reset --hard e9efa77 回退到 e9efa77 版本
推送到远程服务器：git push -f -u origin master

四，rebase好处

> 想要更好的提交树，使用rebase操作会更好一点。 这样可以线性的看到每一次提交，并且没有增加提交节点。 
merge操作遇到冲突的时候，当前merge不能继续进行下去。手动修改冲突内容后，add 修改，commit 就可以了。 
而rebase操作的话，会中断rebase,同时会提示去解决冲突。 解决冲突后,将修改add后执行git rebase –continue继续操作，或者git rebase –skip忽略冲突。
