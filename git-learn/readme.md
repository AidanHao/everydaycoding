1. # git init 初始化本地仓库(让git掌管文件夹)
2. # git status 查看该仓库中的文件状态
3. # git add . 提交所有文件 (.变为文件名则是提交文件名为此的文件)  到git暂存区
4. # git commit -m '你的注释'  将暂存区的代码提交到master区域
5. # git push origin master 将文件推送到远程仓库

-test 

# git init 项目初始化带本地仓库的项目
    - git-learn 工作区
    - .git 隐藏文件夹 代码仓库
# 为什么先add 再commit
    分几步？
    带业务场景 
    网易上班 请写一个vue + langchain 写一个聊天功能
    1.py
    2.vue 写界面
    两个文件 add放入到暂存区
    git add 1.py
    git add 2.vue
    git commit -m '你的描述' 老板要看的，
        你写了git commit -m 就说明你完成一个功能，一个上午大概会提交三次
        git add . 在公司的时候不要用，一次性全部提交了，把无关的文件也提交了
        所以，我们不要提交无关的文件
        本地和服务器 不同的电脑 本地-远程-协作者 这种就是分布式
    git status 查看一下，返回当前仓库的所有状态 要经常查看，面试表达 的时候要说的
# 当我们在写代码时，有可能会改到别人的代码，摸了个鱼，忘了
    git status 查看一下当前仓库状态 
    对比修改 ？ 到底改了点啥？
    git diff 在add之前，再次确认你改了哪些？
