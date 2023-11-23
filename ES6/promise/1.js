// let flag = false;//开关变量
//...
//if (flag) {
// b()
// }

// // a的词法作用域在全局
// function a(){
//     setTimeout(()=>{
//     console.log('我是a');
//     b()//作用域  这里叫回调
// },1000)
// }
// function b(){
//     setTimeout(() => {
//         console.log('这里是回调b');
//     }, 2000);
    
// }
// a()


// //解释回调！
// function a(cb){
//     setTimeout(()=>{console.log('呵真');
//     b()//作用域  这里叫回调
// },1000)
// }
// function b(){
//     setTimeout(() => {
//         console.log('10某地');
//     }, 2000);
    
// }
// a(b)


//坑！a执行完了就是执行完了！
function a(b){
    let age =19//b调用不了age
    setTimeout(()=>{
        console.log('我是a');
    b()//作用域  这里叫回调
},1000)
}
function b(){
    console.log(age);
    setTimeout(() => {
        console.log('我是b');
    }, 2000);
}
a(b)




//假设函数b的执行一定要依赖函数a的结果
//异步问题：我们就是要让它从上到下进行运行！

//请求就是耗时的,网络请求是要看网速的，我们控制不了网速，有时候存在丢包！
//假如我们一定要先实现a再实现b呢？


// 后端从数据库中拿数据，通过HTTP协会把数据传给前端，当我们刷新的时候，前端向后端发送一个请求，后端再返回新的数据
// 刷新也是耗时的