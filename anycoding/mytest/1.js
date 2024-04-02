// function debounce(fn,delay){
//     let timer =null
//     return function(){
//         if(timer){clearTimeout(timer)}
//         else{
//             timer = setTimeout(()=>{
//                 fn.apply(this,arguments)
//             },delay)
//         }
//     }
// }

// function throttle(fn,delay){
//     let timer = Date.now()
//     return function(){
//         if(timer-Date.now()>=delay)
//         {
//             fn.apply(this,arguments)
//             timer = Date.now()
//         }
//     }
// }

// // 实现一个new操作符
// function Car(name) {
//     this.name = name
// }
// function mynew(fn,...arguments){
//     let obj = {}
//     obj.__proto__ = fn.prototyoe
//     let res = fn.call(obj,...arguments)
//     return res instanceof Object ? res:obj
// }
// console.log(mynew(Car,'宝马','宝马'));


// // 实现一个深拷贝
// function deepcopy(obj){
//     let newobj = typeof obj=='function'?[]:{}
//     for(let key in obj)
//     {
//         if(obj.hasOwnProperty(key)){
//             if(typeof obj[key] === 'object'&&obj[key]!=null){
//                 newobj[key] = deepcopy(obj[key])
//             }else
//             {
//                 newobj[key] = obj[key]
//             }
//         }
//     }
//     return newobj
// }

// let obj = {
//     '1':{
//         '2':14
//     },
//     '3':5
// }
// let obj2 = deepcopy(obj)
// obj2[3] = 10
// console.log(obj);
// console.log(obj2);

// 手写一个instanceof
// function myinstanceof(obj,type){
//     if(typeof type!=='function')return false
//     let objproto = Object.getPrototypeOf(obj)
//     while(objproto)
//     {
//         if(objproto === type.prototype)
//         {
//             return true
//         }else
//         {
//             objproto = Object.getPrototypeOf(objproto)
//         }
//     }
//     return false
// }
// let a = ''

// console.log(myinstanceof(a,Number));
// console.log(a instanceof String);

// // 手写柯里化
// function add(a,b,c){
//     return a+b+c
// }
// function curry(fn){
//     return function curryed(...args){
//         if(args.length>=fn.length){
//             return fn.apply(this,args)
//         }else{
//             return function(...args2){
//                 return curryed.apply(this,args.concat(args2))
//             }
//         }
//     }
// }
// let add2 = curry(add)
// console.log(add2(1)(2,3));

// // 手写发布订阅
// class EventEmitter {
//     constructor() {
//         this.event = {}
//     }
//     // 用于订阅
//     on(type,cb) {
//         if(!this.event[type])
//         {
//             this.event[type] =[cb]
//         }else
//         {
//             this.event[type].push(cb)
//         }
//     }
//     // 订阅一次
//     once(type,cb) {
//         let fn = function(...args){
//             cb(...args)
//             this.off(type,cb)
//         }
//         this.on(type,fn)
//     }
//     //用于发布事件
//     emit(type,...args) {
//         if(!this.event[type])
//         {
//             return
//         }else{
//             this.event[type].forEach(cb=>{
//                 cb(...args)
//             })
//         }
//     }
//     //用于取消订阅
//     off(type,cb) {
//         if(!this.event[type])
//         {
//             return
//         }else{
//             this.event[type] = this.event[type].filter((item)=>{item!=cb})
//         }
//     }
// }
// // 用法
// let ev = new EventEmitter();
// const fn = (a, b) => {
//     console.log(a, b, 1);
// }
// const fn1 = (a, b) => {
//     console.log(a, b, 2);
// }
// // 多个对象对同一个事件进行了订阅
// ev.on('run', fn)
// ev.on('run', fn1)

// // 发布一个run事件，还可以接收一个参数
// ev.emit('run', 1, 1)
// ev.emit('run', 3, 3)

// // 手写call
// Function.prototype.mycall = function(context,...args){
//     if(typeof this !=='function'){
//         return new TypeError('type error')
//     }
//     context = context || window
//     // 缓存this
//     context.fn = this
//     const result = context.fn(...args)
//     delete context.fn
//     return result;
// }
// // 手写apply
// Function.prototype.myapply = function(context,args){
//     if(typeof this !=='function')
//     {
//         return new TypeError('type error')
//     }
//     context = context || window
//     context.fn = this
//     const result = args?context.fn(...args):context.fn()
//     delete context.fn
//     return result
// }
// // 手写bind
// Function.prototype.mybind = function(context,...args){
//     if(typeof this!=='function'){
//         return new TypeError('type error')
//     }
//     context = context||window
//     context.fn = this
//     return function(...args2){
//         const result = context.fn(...args,...args2)
//         delete context.fn
//         return result
//     }
// }


