// node 后端自定义事件 因为node是异步无阻塞，那些耗时的事件都是通过函数调用的放入到event-bus里面
// node commonjs语法
// 要使用es6语法 用 mjs babel 转译 es6  => es5 就好像 style => css

const geektime = require('./geektime')

// 有点像监听事件 注册了一个newlesson 自定义（相当于click等自带）事件
// 回调函数
// 添加自定义事件的能力 响应式 有点类似于依赖收集 又叫观察者模式
geektime.on('newlesson', ({ price }) => {//newlesson 是事件名  后面的回调是注册函数
    console.log('Yeah, new leason!');
    if (price < 80) {
        console.log('buy');
    }
})

// setTimeout(() => {
//     for (let i = 0; i < 100; i++) {
//         geektime.on('newlesson', ({ price }) => {
//             console.log('hehe', price);
//         })
//     }
// }, 10000)