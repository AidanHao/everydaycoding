# 企业级开发

- 代码的健壮性
    效验一下参数
    进程的安全性
    单线程 简单 + event loop    太脆了
    throw + try catch()

- cache 自由变量 key 设置
    1 + 12  11 + 2   ‘1，12’  ‘11，2’  
- arguments 伪数组 兼容性不太好 (下面的两个 要浏览器支持ES6)
[...arguments].join(',')
或者Array.from(arguments)
但是我们这里不这样用,我们这样用
(Object.prototype.toString)
Array.prototype.join.call(argument) 借
[1,2,3].join(',') //this指向数组

- fibonacci 爬楼梯问题 
    - 递归的通用性问题，爆栈，不停的入栈（解决相似的问题） 终局思想
        自顶向下 CEO思想，递归的不停的入栈
    - 记忆函数 备忘录
    - 自底向上解决问题
    f(1) = 1 f(2) = 1 f(3)=f(1)+f(2)
    f(n) = f(n-1) + f(n-2)

- 使用递归，快速的，基于自顶向下的思想来解决问题
    - 程序栈的问题

- 可以先使用memoize 备忘录模式，优化 
    空间 { } key:value

- 都可以自下向上解决，每一步都有一个公式 f(n) = f(n-1) + f(n-2)
动态规划 dp 
    for 循环
- 99%
    空间再优化，不需要数组，我们只需要最后的结果、
    [a,b] = [b,a+b]

js是原型式的面向对象