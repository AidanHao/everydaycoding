- vue 脚手架
    - npm init vite 使用vite脚手架安装项目
    1、初始化vue 项目 ， 下载了项目模板 starter
    2、初始化的时候选择vite 很快
    - cd rate 进入项目目录
        /src 是开发目录
    - npm i 安装项目需要的依赖 可以查看package.json 中的dependencies devDependencies(开发阶段) 就是所需要的依赖
        vue3.0+
        vite
    - npm run dev  vite 
        位于scripts脚本区
    - npm run build 
        打包 会生成一个dist目录 我们只要让dist交给后端上线就可以啦
        dist目录
    - 把页面按组件划分
        每个组件都是一个vue文件
        - html 结构
        - script js
        - style css

- 组件化思想
    component