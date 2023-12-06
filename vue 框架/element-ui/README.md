# 路由传参
1. this.$router.push(`/home/${this.account}`) 需要在路由申明，路由配置当中声明该路径可以携带参数'/home/:user'

2. this.$router.push({path:'/home',query:{user:this.account}}) 它会将参数以?的形式拼接在url中,

3. this.$router.push({name:'home',params:{user:this.account}}) 也需要在路由配置当中声明路径可以携带参数'/home/:user'，它是不会出现在url地址中

4. this.$router.push({name:'home',hash:`#${this.account}`}) 参数前面会多一个#





.browserslistrc 这个文件是浏览器问题兼容性问题，课要不要
.gitignore 把提交的时候能过滤的都过率了，不会被git上传
babel是用来配置，把高级代码转换为低级代码
jsconfig.json 是vue cli的配置的文件，target目标版本 @符号代表src文件夹
package-lock.json 记录的是  生成另外一份说明书，告诉你装的脚手架来自于哪个仓库 有迹可寻
package.json 是说明书 node库的配置‘
vue.config.js 是vue的配置
less 可以嵌套
npm install element-plus --save --save表示要安装在生产环境，表示项目开发完之后这一段代码仍然要保留，
less源码装在开发环境不在生产环境，开发完之后，只要css文件
# element-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

