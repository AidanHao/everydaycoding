# vue 缺点
next 是 vue 服务器渲染框架
右键检查查看代码,看不到信息，对SEO不友好，爬虫只能爬index.html
    比如csdn用的技术比较老，但是搜索的时候，csdn考前，掘金靠后，就是因为掘金的seo没有csdn好
    掘金做了ssr服务器端渲染
    移动端一般是点开分享链接，目前

# SSR 服务端渲染
- / 网络请求
    - index.html root挂载点 script main.js
        vue js
    - 对SEO搜索引擎 十分不友好
        爬虫只会爬取index.html 不能够进入js并且执行

    - PC or Mobile
        PC端浏览来自百度，SEO非常重要
        Mobile来自于链接分享，App的内嵌页，SEO 没有那么重要
        重要 VUE SPA 主流开发？ CSR Client Side Rendering 客户端渲染

    - PC站 google/baidu

        !! SSR Server Side Rendering 服务器端渲染

    - vue可以在服务器端运行不 
        和前端挂钩只有模板渲染这一块、虚拟dom是dom对象，dom对象等下要渲染成什么样的界面，只需要一个指令，然后根据指令渲染成dom对象，然后渲染成html
            虚拟dom和响应式 都可以在服务器端执行掉

- 平台无关性渲染
    - vue除了客户端渲染挂载，不能做之外，其他的都可以在服务器端运行
    - 响应式/组件/虚拟dom 可以在node （服务器）环境运行
    - 虚拟DOM渲染为何种界面，可以由平台决定
        uniapp 小程序
        html
    - 怎么样吧SEO ？
        组件内容以界面需要的string字符串返回
        爬虫就能拿到

- CSR SSR 平台无关性渲染 
    @vue/server-renderer VDOM -> 渲染字符串

- 了解服务器端渲染SSR和Nuxt开发
