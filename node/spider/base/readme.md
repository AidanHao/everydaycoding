# Node.js 
是一个环境，是基于谷歌b8引擎打造的一个运行环境
是一个基于Chrome v8 引擎的 js 运行环境



npm init 是node.js的包管理器
项目名称 版本 描述 入口 不管 git仓库 关键字  作者  证书
不管项目有多大，都可以使用一个文件完成,
但是实际不会，会按照功能或者模板分开进行封装
https://www.npmjs.com/
上述网址的node库
npm config get registry查看当前的源
 npm config set registry https://registry.npm.taobao.org
换淘宝的源码
 npm config set registry https://mirrors.huaweicloud.com/repository/npm/
换华为的源码

实在装不下来npm i yarn -g 
换一个包管理工具

yarn add xxx也是包管理器

node mols太大了，我们可以删掉使用 npm i
添加一个.gitignore 在里面写/文件名/  提交代码的时候就会忽略这个文件