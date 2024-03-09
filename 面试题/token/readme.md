# token (令牌)


- cookies 是浏览器的内存空间，但是受后端的掌控，通常是后端将登录令牌保存在cookies中，所有被保存在cookies中的数据，都会在http请求时，自动被携带在请求头当中，大小只有大约4kb

浏览器里面cookies不应该被前端处理，而是由后端进行管理

明文传输是不安全的

阮一峰token文章地址
https://ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

- token由三部分组成 由header（头部）、payload(负载)、signature(前面) 组成

- 前端登录后，后端校验账户密码成功后，靠jwt来生成一个token，并将该token返回给前端，前端在接收到token后，将token保存在浏览器本地缓存，封装了axios ， 在请求拦截当中为每一次的请求头添加一个Authorization字段，之后的接口请求，后端获取到请求头中token并进行校验，如果token合法则返回数据，否则返回401状态码，告诉前端token失效