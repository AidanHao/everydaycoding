# vue 网易云音乐
npm init vite
v3-music
vue
javascript
进入目录
npm i
npm run dev
- 界面
    npm init vite 搭建了开发脚手架
    ：5173端口，负责前端
- 后台
    netsea
    :3000端口，
- 前后端分离的全栈开发

- npm换源

- tailwindcss 主流开发方式，不用再去新建css文件，提升60%以上的css开发，原始化css开发 提供了一套css类名
    - npm config set registry https://registry.npmmirror.com 等下要按照各种各样的包
        npm config set registry 设置安装的源头,npm换源
    - npm i -D tailwindcss postcss autoprefixer 安装工具
        npm i -D 开发阶段会用到一定要加-D，上了线之后是不要的 会出现在dependencies
    - devDependencies 开发阶段的依赖 dependencies 上线时的依赖，打包的时候只会打包这个里面的
    - npx tailwindcss init -p 多了tailwind.config.js 的配置文件和postcss.config.js配置文件
        npx tailwindcss init -p 初始化工作
        npx 执行安装或者未安装的包
    - 再去配置tailwind.config.js文件
    - 声明开发目录下所有层级中，.vue等格式文件支持tailwindcss
    - tailwind.css
        可以使用tailwind 的类名
- 切页面
- 组件化思维
    - 根组件 App.vue
    - layout 组件 只负责和layout'相关的页面，不负责组件
        - Menu
        - Header

- vite.config.js 是 vite 工程化的配置文件
    - alias 短路径
        只要加了@ 就代表走到了./src 类似回城






NeteaseCloudMusicApi-master
首先npm install安装依赖
再npm run start