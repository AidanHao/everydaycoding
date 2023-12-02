文件夹中打开终端
npm init vite
rate
选择vue
再选择js
cd rate
npm i
npm run dev


- vue 脚手架
    - npm init vite 
    1、初始化vue项目,下载了项目模板 starter
    src是开发目录，main.js是入口 ,index.html 是页面
    2、初始化的时候选择 vite 重点考点，快！！
    - cd rate 进入到项目目录
        /src 是开发目录
    - npm i（npm install）安装项目需要的依赖：package.js有个dependencies安装的是3.3.8  devDependencies 开发阶段依赖vite
        vue 3.0+
        vite
    - npm run dev vite启动才能启动  dev ->development
        scripts   
    - npm run build 生成dist结果目录 assets 有需要的js和css
        dist 目录
    - 把我们的页面按组件划分
        每个组件都是vue文件
        - html 结构
        - script js
        - style  css
- 组件化思想
    component
    开发单元是html 标签 太低级了 没有复用性
    vue 提供了组件的概念 复用性
    组件是一推html ，css,js的集合，完成某个展示和功能
    开发任务的拆分 

- DOM 树 -> 组件树
    这个组件做过，可以不用写
    .vue 组件的思想 分工 组件可以复用 优化
- devtool 
- 数据 MVVM思想 
    - ref 响应式 使用ref包装数据能实时刷新
- Laf 


