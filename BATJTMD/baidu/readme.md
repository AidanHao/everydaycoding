# 百度编程能力 

    - 文章
        aigc
        热榜->别人的文章->找到主题
        费曼学习法 教别人学习是最好的学习
        再深入的主题，讲到尽可能小白能听懂


- 计算机网络1
    - openai 网络请求 怎么搞？
        Openai 请求过程的图形化介绍(postman)
        postman http请求制造工具
    - postman（窥探到协议层）
        模拟 
        openai.Completion.create() 运行所在？代码层 本地调试 + 项目服务器运行
        运行 物理层（你的电脑）
        LLM openai 的服务器集群 
        协议层 HTTPS互联网超文本传输协议 HTTPS有七层最深 底层有IP地址 HTTPS是Web的基础 openai 封装了http请求库
        层次不一样

        HTTP 状态码 status code
        1xx  请求还在进行中
        2xx  成功
        3xx  跳转（还要跳转到别的地方）
        4xx  客户端错误
            401 未授权，客户端没有权限 UnAuthorizedG
        5xx  服务器错误
        HTTP 基于请求响应的简单协议
            请求行 POST + url   短小
            头部    Key = val Authorization = api-key
            请求体

        model davince  请求者 400 Bad Request   
        JSON 数据交换的标准
        post请求的方法