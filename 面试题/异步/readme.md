# js为什么要有异步？
因为js是单线程的编程语言，同一时间只能执行一个任务，
    其根本原因是因为js是单线程，无法同时执行多个任务，造成代码执行过程中的阻塞
# js为什么不设计成多线程 （js是一门脚本语言）
1. 节约内存
    为什么要节约内存？ 
2. 没有锁，解锁的过程，节约上下文切换的时间

# 请你聊一聊异步的发展史
- 是什么
    js中从最早的异步处理方式到现在的最新的异步处理方式

- 最早异步的处理方案是回调
- 发展史
1. 回调函数：代码维护困难（回调地狱） 回调不会爆栈
2. promise : 一个promise对象的resolve接收一个promise对象为参数，只要里面有resolve值，可以直接掏出来
    请问promise是如何把异步处理成同步的？promise的源码是怎么写的？
    1. 维护了一个状态，state，值为：pending fulfilled rejected，目的是让promise的状态一经改变，就无法再次修改，也就保证了then 和 catch 不可能同时触发 resolve执行 then里面的回调触发 ，reject 执行 catch 里面的回调
    2. 内部的resolve会修改状态state为fulfilled，并且触发then里面的回调，内部的reject会修改状态state为rejected，并且触发catch里面的回调
 
    3. then: 方法race
        1. 默认返回一个promise对象，状态为fulfilled
        2. 当then前面的promise的状态为fulfilled时，then里面的回调函数会执行
            当then前面的promise的状态为rejected时，then里面的回调函数不会执行，then里面第二个回调函数就会执行,或者说执行catch里面的回调函数 
            当then前面的promise的状态为pending，then中的回调函数需要被缓存起来交给resolve或者reject执行
        3. 手写race 方法
        4. 手写all方法
<!-- 在promise之后处理异步的方式，官方还打造了一个generator 后面才打造了async await -->
3. generator 他的写法不是很优雅
    generator翻译过来又叫 生成器函数：yield
    1. 可以分段执行，可以暂停
    2. 可以控制每个阶段的返回值
    3. 可以知道是否执行完毕
    4. 可以借助 Thunk 和 co 模块 来处理异步 可以处理异步但是写法复杂 所有generator函数的意义其实是为了打造 async await

4. async/await 
    1. 属于是ES6 的一种新的处理异步代码的方案
    2. 缺点：对于promise来说，promise可以有一个catch用于捕获错误，但是async/await没有错误捕获机制 (通常我们会自己给它套一层try...catch)
        优点：简便好用
    3. async/await 本质是由promise结合generator进行封装来实现处理异步的手段，本质是在generator的基础上，通过递归的方式来自动地执行一个又一个的next函数并传递参数，当done为true时结束递归！从而拿到最终你想要的结果！其实这也是co模块的原理！

