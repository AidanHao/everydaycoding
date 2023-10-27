# 企业级界面开发规则

- html css js 功能分离
- css 架构

    - reset.css 样式重置
        去除浏览器的样式区别，无差别页面显示
        box-sizing 盒子大小的计算方式
        浏览器好多家 edge  chrome 区别在于内核不同
        文档流 body开始，从上到下块级元素，行内元素从左到右，就形成了文档流
        盒子在页面上占了多少呢?比较难
        有点类型房子的公摊
        标准盒子模型 = content + padding + border + margin(很多浏览器都在使用)
        2种盒模型
        IE盒模型 = content(自动缩放)+padding + border + margin 
    -base.css 通用样式
- css 命名套路
    -page Block
        __hd __bd __ft 头，身体，尾巴
    -btn panel cell 这些都是Block
    -框架组件 仍然遵守BEM
- css '+'这个加号是 兄弟选择器
- google 图片格式
    base64 图片 小一点简单的图片 写在css文件里
    jpg|png|jpeg|wtt|webp   比较大，而且是单独的文件，html在下载的时候要使用下载的线程，太多照片会带来请求并发！