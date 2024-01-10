webpack打包工具
服务器是一种公网
代码量不能太大了
注释写完挂载到服务器的时候是没有意义的

企业一大发展起来，自己就会建设一个服务器，一些小公司就会去租服务器

我们需要工具打包项目，在程序中打包是把代码中有用的代码全部拿出来，把没有用的代码剔除掉，变成一种密密麻麻的代码并且能够运行这就是打包

yarn build 或者npm run build 就是对项目打包 dist 中的html会多了一个script和css 变成了最原始的代码，html+css+js

会包括框架中使用的样式等等

直接运行html文件，可能会有跨域的问题，理论上是有效果的，实际上这些资源必须当做服务资源返回才可以 vite build 是封装了的打包

yarn build 就是运行 vite build 

vite 其实也是一种打包工具


vite 和 webpack 是同一级的工具
webpack 是一个非常老牌的构建工具
国内比较活的构建工具 grunt glup
vite 

webpack 的受众非常大 我们要学的就是vite和webpack

npm i webpack -g 装一个全局
npm i -g webpack-cli
npm init -y 初始化

# 使用webpack
- 初始化一下 npm init -y   
    <!-- type='module'要告诉浏览器，我们将使用模块化的 JavaScript 代码，而不是普通的 <script> 标签引入。 -->
- npm i webpack webpack-cli -D (-D表示在开发阶段使用)||npm i webpack webpack-cli -g (-g表示在全局使用)
    创建一个webpack.config.js 配置文件
    webpack 目前是最新第五版本
    loader 和 plugin 比较难  源码是用node 其实就是js写的 其实vite也是用node写的
    webpack 没有逻辑要写，只要配置
    webpack 会将文件打包成 eval欺骗词法作用域 负责把原本不属于这里的代码搬到这里了
    webpack 只能打包js代码 
    loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。 
    pllugin loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。 插件的能力包含了loader的能力

npm i html-webpack-plugin -D  安装一个插件
webpack 打包构建原理   webpack开发插件 

但是webpack目前不能处理很新的es，但是它可以找帮手

npm install css-loader style-loader -D   装css loader 和 style loader

npm i mini-css-extract-plugin -D 安装一个插件 用于额外创建一个css文件
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime -D  负责安装babel
npm i vue
 npm i vue-template-compiler vue-loader @vue/babel-preset-jsx -D 让webpack可以解析vue文件
