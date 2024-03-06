# Laf

- 在线云开发平台，让我们快速开发产品并上线
    - 云数据库
        mongodb  NOSQL 以JSON的方式来查询和存储 前端比较喜欢的数据库
    - 云函数
        写一个函数，就可以在云端运行
        get 获取 post新增 put和patch修改 delete删除
        权限问题
        可以获取一个URL
        import cloud from '@lafjs/cloud'//lafjs 提供的cloud模块
        const db = cloud.database()//获取云数据库 ，从云端连接数据库
        export async function main(){}//main是入口 
        一个函数就是一个应用 
        export 模块化输出 
        async await 异步的，可以使用await
         const res = await db.collection('todos').get()//获取对应数据库中的值//数据查询
    - 将项目上线 将静态页面上线
        - github page
        - laf 托管
    - 存储  上次前端页面之后：https://oss.laf.run/s9ayez-todos/index.html
    个人域名备案 .com .cn .xyz 公安局备案，独立域名项目
    函数负责功能，集合负责数据 存储负责上传
    理解ctx.body 请求行：最短的信息 url请求的方法  协议版本（1.1，1.0，2.1主流） 
    请求头：各种key：value信息  
    请求体:post请求
    增加add
    ch
    条件：where
