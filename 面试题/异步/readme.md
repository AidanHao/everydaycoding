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
2. promise :
    请问promise是如何把异步处理成同步的？promise的源码是怎么写的？
    1. 维护了一个状态，state，值为：pending fulfilled rejected，目的是让promise的状态一经改变，就无法再次修改，也就保证了then 和 catch 不可能同时触发 resolve执行 then里面的回调触发 ，reject 执行 catch 里面的回调
    2. 内部的resolve会修改状态state为fulfilled，并且触发then里面的回调，内部的reject会修改状态state为rejected，并且触发catch里面的回调
 
