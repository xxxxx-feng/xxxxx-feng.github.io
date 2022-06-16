(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{381:function(t,e,n){"use strict";n.r(e);var i=n(44),r=Object(i.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("p",[t._v("一，代码提交")]),t._v(" "),n("blockquote",[n("p",[n("strong",[t._v("第一种方法：（常用）")])]),t._v(" "),n("p",[t._v("1、git add .\n（后面有一个点，意思是将你本地所有修改了的文件添加到暂存区）")]),t._v(" "),n("p",[t._v('2、git commit -m""'),n("br"),t._v("\n(引号里面是你的介绍，就是你的这次的提交是什么内容，便于你以后查看，这个是将索引的当前内容与描述更改的用户和日志消息一起存储在新的提交中)")]),t._v(" "),n("p",[t._v("3、git pull --rebase\n（这是下拉代码，将远程最新的代码先跟你本地的代码合并一下，如果确定远程没有更新，可以不用这个，最好是每次都执行以下，完成之后打开代码查看有没有冲突，并解决，如果有冲突解决完成以后再次执行1跟2的操作）")]),t._v(" "),n("p",[t._v("4、git push\n（将代码推至远程就可以了）")])]),t._v(" "),n("blockquote",[n("p",[n("strong",[t._v("第二种方法：（避免有冲突多次提交，高级用法）")]),t._v('\n1、git stash\n（这是将本地代码回滚值至上一次提交的时候，就是没有你新改的代码）\n2、git pull --rebase\n（将远程的拉下来）\n3、git stash pop\n（将第一步回滚的代码释放出来，相等于将你修改的代码与下拉的代码合并）\n然后解决冲突，你本地的代码将会是最新的代码\n4、git add .\n5、git commit -m ""\n6、git push')])]),t._v(" "),n("p",[t._v("二，分支管理")]),t._v(" "),n("blockquote",[n("p",[n("strong",[t._v("本地新建分支同步到远端")]),t._v("\n切换到某一分支，拉取一个新的本地分支\ngit checkout -b  分支名称\n（创建分支并且切换到分支）\ngit  push -u origin 分支名称\n（新创建的分支同步到远程仓库）")])]),t._v(" "),n("blockquote",[n("p",[n("strong",[t._v("分支合并")]),t._v("\ngit branch (查看本地分支)\ngit checkout 分支名称\ngit pull --rebase(多人开发时)\ngit merge --no-ff 分支名称\n（--no-off 禁止快进式合并,  --no-ff 会让 Git 生成一个新的提交对象。快进式合并会把 feature 的提交历史混入到 master 中，搅乱 master 的提交历史。）\n合并出现冲突时需要解决冲突，然后重新提交   git push origin 分支名称")])]),t._v(" "),n("blockquote",[n("p",[n("strong",[t._v("分支删除")]),t._v("\ngit remote update origin --prune\n（更新远程分支列表）\ngit push origin --delete Chapater6\n（删除远程分支Chapater6）\ngit branch -d  Chapater6\n（删除本地分支 Chapater6）\ngit fetch --prune origin 或者 git fetch -p\n(获取被删减后的远程分支)")])]),t._v(" "),n("p",[t._v("三，版本回退")]),t._v(" "),n("blockquote",[n("p",[n("strong",[t._v("git操作日志")]),t._v("\ngit log --decorate --graph --oneline --all #显示当前及之前的版本号 git\nlog --pretty=oneline #将版本历史显示为一行， 历史版本号全部显示 git log --pretty=oneline\n--abbrev-commit #将版本历史显示为一行， 历史版本号部分显示 git log --graph #查看分支合并图")])]),t._v(" "),n("blockquote",[n("p",[t._v("执行版本退回后，本地工作区的内容会自动和回退到的版本库版本的内容保持同步\ngit reset --hard HEAD^ 回退到上一个版本\ngit reset --hard HEAD^^ 回退到上上个版本，以此类推，一次提交即为一个版本\ngit reset --hard e9efa77 回退到 e9efa77 版本\n推送到远程服务器：git push -f -u origin master")])]),t._v(" "),n("p",[t._v("四，rebase好处")]),t._v(" "),n("blockquote",[n("p",[t._v("想要更好的提交树，使用rebase操作会更好一点。 这样可以线性的看到每一次提交，并且没有增加提交节点。\nmerge操作遇到冲突的时候，当前merge不能继续进行下去。手动修改冲突内容后，add 修改，commit 就可以了。\n而rebase操作的话，会中断rebase,同时会提示去解决冲突。 解决冲突后,将修改add后执行git rebase –continue继续操作，或者git rebase –skip忽略冲突。")])])])}),[],!1,null,null,null);e.default=r.exports}}]);