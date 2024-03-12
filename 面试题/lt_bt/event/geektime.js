// node 自带 events模块 最最重要的模块，异步处理都是基于这个模块来实现的
//EventEmitter是一个类 天生就是订阅发布者设计模式

const EventEmitter = require('events').EventEmitter
// 通过继承EventEmitter类，可以继承EventEmitter类的属性和方法
// 继承
class Geektime extends EventEmitter{
    constructor(){
        super(),
        setInterval(()=>{
            this.emit('newlesson',{
                price:Math.random() * 100
            })
        },3000)
    }
}
module.exports = new Geektime