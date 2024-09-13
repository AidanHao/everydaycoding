// 实现一个new操作符
function Car(name,price) {
    this.name = name;
    this.price = price
    // return {};
  }
  function myNew(fn,...args){
    let obj = {}
    obj.__proto__ = fn.prototype
    let res = fn.call(obj,...args)
    return res instanceof Object ? res:obj
  }
  let car = myNew(Car, "宝马",12000000);
console.log(car);
// 手写instance
function myInstanceOf(obj,type){
    if(typeof type !=='function'){
        return TypeError("Type error")
    }
    let proto = Object.getPrototypeOf(obj)
    while(proto){
        if(proto === type.prototype){
            return true
        }else{
            proto = Object.getPrototypeOf(proto)
        }
    }
    return false
}
//手写深拷贝
function myDeepCopy(obj){
    let newobj = Array.isArray(obj)?[]:{}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] === 'object'&&obj[key]!=null){
                newobj[key] = myDeepCopy(obj[key])
            }else{
                newobj[key] = obj[key]
            }
        }
    }
    return newobj
}
// 手写柯里化
function curry(fn){
    return function curred(...args){
        if(args.length >= fn.length){
            return fn.apply(this,args)
        }else{
            return function(...args2){
                return curred.apply(this,args.concat(args2))
            }
        }
    }
}
// 手写防抖节流
function debounce(fn,delay){
    let timer = null
    return function(){
        if(timer)clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,...args)
        },delay)
    }
}
function throttle(fn,delay){
    let starttimer = Date.now()
    return function(){
        if(Date.now() - starttimer>=delay){
            fn.apply(this,...args)
            starttimer = Date.now()
        }
    }
}
// 手写发布订阅
class EventEmitter {
    constructor() {
      this.event = {}
    }
    // 用于订阅
    on(type,cb) {
        if(!this.event[type]){
            this.event[type] = [cb]
        }else
        {
            this.event[type].push(cb)
        }
    }
    // 订阅一次
    once(type,cb) {
        let fn = function(...args){
            cb(...args)
            this.off(type,cb)
        }
        this.on(type,fn)
    }
    //用于发布事件
    emit(type,...args) {
        if(!this.event[type]){
            return
        }else{
            this.event[type].forEach(cb => {
                cb(...args)
            });
        }
    }
    //用于取消订阅
    off(type,cb) {
      if(!this.event[type]){
        return
      }else{
        this.event[type] = this.event.filter(item=>{
            item!==cb
        })
      }
    }
  }
  
  // 用法
  let ev = new EventEmitter();
  const fn = (a, b) => {
    console.log(a, b, 1);
  };
  const fn1 = (a, b) => {
    console.log(a, b, 2);
  };
  // 多个对象对同一个事件进行了订阅
  ev.on("run", fn);
  ev.on("run", fn1);
  
  // 发布一个run事件，还可以接收一个参数
  ev.emit("run", 1, 1);
  ev.emit("run", 3, 3);


//   手写并发
class SuperTask{
    constructor(maxnum){
        this.maxnum = maxnum
        this.runningtask = 0
        this.tasks = []
    }
    add(fn){
        return new Promise((resolve,reject)=>{
            this.tasks.push({fn,resolve,reject})
            this.run()
        })
    }
    run(){
        if(this.runningtask<this.maxnum&&this.tasks.length){
            this.runningtask++
            const {task,resolve,reject} = this.tasks.shift()
            task()
            .then(resolve,reject)
            .finally(()=>{
                this.runningtask--
                this.run()
            })
        }
    }
}

// 手写红绿灯
class TrafficLight{
    constructor(){
        this.colors = ['绿色','黄色','红色','黄色']
        this.times = [2000,1000,3000,1000]
        this.isrun = false
        this.currentIndex = 0
    }
    start(){
        this.isrun = true
        run()
    }
    async run(){
        while(this.isrun)
            {
                await new Promise((resolve,reject)=>{
                    console.log(this.colors[this.currentIndex]);
                    setTimeout(()=>{
                        resolve()
                    },this.times[this.currentIndex])
                    this.currentIndex = (this.currentIndex + 1)%this.times.length
                })
            }
    }
}
// 手写promise的all
function all(promises){
    return new Promise((resolve,reject)=>{
        let result = []
        let num = 0
        for(let i = 0;i<promises.length;i++){
            promises[i].then((value)=>{
                result[i] = value
                num++
                if(num == promises.length){
                    resolve(result)
                }
            },
            (error)=>{
                reject(error)
            })
        }
    })
}
// 手写promise的any方法
function any(promises){
    return new Promise((resolve,reject)=>{
        let result = []
        let num = 0
        for(let i = 0;i<promises.length;i++){
            promises[i].then(
                (value)=>{resolve(value)},
                (error)=>{
                    result[i] = error
                    num++
                    if(num>=promises.length){
                        reject(new AggregateError(arr))
                    }
                }
            )
        }
    })
}
// 手写promise的race方法
function race(promises){
    return new Promise((resolve,reject)=>{
        for(let promise of promises){
            promise.then(
                (value)=>{resolve(value)},
                (error)=>{reject(error)}
            )
        }
    })
}
// 手写allsettled
function allSettled(promises){
    return new Promise((resolve,reject)=>{
        let result = []
        let num = 0
        function check(){
            if(num == promises.length){
                resolve(result)
            }
        }
        for(let i = 0;i<promises.length;i++){
            promises[i].then(
                (value)=>{
                    result[i] = {state:'fulfilled',value}
                },
                (error)=>{
                    result[i] = {state:'rejected',error}
                    
                }
            ).finally(()=>{
                num++
                check()
            })
        }
    })
}
// 手写finally
function myfinally(cb){
    return this.then(
        (value)=>{return Promise.resolve(cb()).then(()=>value)},
        (error)=>{return Promise.reject(cb()).then(()=>{
            throw  error
        })}
    )
}