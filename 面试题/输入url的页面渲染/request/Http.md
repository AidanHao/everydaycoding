浏览器中最重要的使用最多的协议

# 超文本传输协议HTTP/0.9
html就是超文本
http协议是基于TCP协议的
1. 客户端发送GET请求，请求一个 根路径 /index.html，
2. 服务器接收到请求后，读取对应的html文件，以ASCII的字符流返回给客户端

- 特点：
1. 只有一个请求行，没有请求头和请求体
2. 服务器没有响应头
3. 传输的内容是以ASCII的字符流来传输


# HTTP/1.0
相比于0.9 1.0 版本可以支持多种类型文件的传输

通过引入请求头和响应体来让客户端和服务端更加深入的交流 通过key-value的形式

- 为什么有了请求头和响应头就能支持多种文件的数据传输
请求头：accept：text/html
      accept-encoding：gzip，deflate，br 压缩算法 
      accept-language：zh-CN，zh，en-US，en 浏览器语言
响应体：content-encoding：br
        content-type:text/html,charset=utf-8

# http/1.1
