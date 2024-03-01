// 手写一个发布订阅函数
// 一般面试题长这样
class EventEmitter {
    constructor() {
        // 用数组或者对象
        this.event = {}// 'run':[fun]
    }
    // 用于订阅
    on(type, cb) {
        // 怎么知道emit掉没掉用呢？fn不能放在on里面执行
        // 思路on负责接收回调函数，订阅事件，什么时候emit执行，这个回调函数就触发

        // 如果读不到这个事件
        if (!this.event[type]) {
            this.event[type] = [cb];
        } else {
            // 如果曾经有人订阅过，我就把我的订阅事件加进去
            this.event[type].push(cb);
        }
    }
    // 订阅一次
    once(type,cb) {
        // 订阅一次就得取消
        const fn = (...args) =>{
            cb(...args)
            this.off(type,fn)
        }
        this.on(type,fn)
    }
    //用于发布事件
    emit(type, ...args) {
        if (!this.event[type]) {
            return
        } else {
            this.event[type].forEach(cb => {
                // 打...把数组解构出来
                cb(...args)
            })
        }
    }
    //用于取消订阅
    off(type, cb) {
        if (!this.event[type]) {
            return
        }else
        {
            // 使用filter过滤一下,排除了cb的对象
            this.event[type] = this.event[type].filter(item=>item!==cb)
        }
    }
}
// 用法
let ev = new EventEmitter();
const fn = (a, b) => {
    console.log(a, b, 1);
}
const fn1 = (a, b) => {
    console.log(a, b, 2);
}
// 多个对象对同一个事件进行了订阅
// ev.on('run', fn)
// ev.on('run', fn1)


// 发布一个run事件，还可以接收一个参数
// ev.emit('run', 1, 1)

// 测试取消订阅
ev.on('run', fn)
ev.on('run', fn1)
ev.off('run', fn1)
ev.emit('run', 1, 1)



// 测试一次订阅
// ev.on('run', fn)
// ev.emit('run', 1, 1)
// ev.emit('run', 1, 2)






// const fn2 = (a, b) => {
//     console.log(a, b, 'fn2');
// }
// const fn3 = (a, b) => {
//     console.log(a, b, 4);
// }
// 订阅一个run事件
// ev.on('run', fn)
// 多个对象对同一个事件进行了订阅
// ev.on('run', fn1)

// ev.on('run', fn2)//只想订阅一次
// ev.once('run', fn2)

// ev.on('run', fn3)
// ev.off('run', fn3)


// 发布一个run事件，还可以接收一个参数
// ev.emit('run', 1, 1)
// ev.emit('run', 2, 2)
// ev.emit('run', 3, 3)0



// ev.on('say',fn)
// ev.emit('say','hello world')

