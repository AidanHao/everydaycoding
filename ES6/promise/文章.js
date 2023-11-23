function xq(){
    setTimeout(()=>{
        console.log('龙哥相亲了!');
        marry()
    },2000)

}
function marry() {
    setTimeout(()=>{
        console.log('龙哥结婚了');
    },1000)
}
xq()


// function a(){
//     return new Promise(
//         (resolve,reject) =>{
//     setTimeout(()=>{
//         console.log('a');
//         reject('no')
//     },1000)
// }
//     )
// }
// function b(){
//     return new Promise(
//         (resolve,reject)=>{
//     setTimeout(()=>{
//         console.log('b');
//         resolve('yes')

//     },1500)
// })
// }
// function c() {
//     console.log('c');
// }
// //a和b都要成功运行，.then根据最快完成执行的运行！用于优化代码！比如在接口当中，用race就可以直接拿最快的接口
// Promise.all([a(),b()]).then(c)
// //catch负责兜底
// .catch((err)=>{
//     console.log(err);
// })




// function a(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('你好');
//             reject('不好')
//         },1000)
//     }
//     )
// }
// function b(){
//     setTimeout(()=>{
//         console.log('好好好');
//     },500)
// }
// a()
// .catch((ref)=>{
//     console.log(ref);
//     b()
// })




// function xq(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('龙哥相亲了!');
//             resolve('相亲成功啦！')
//         },2000)
//     })
// }
// function marry() {
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('龙哥结婚了');
//             resolve('结婚完成了')
//         },1000)
//     })
// }
// function baby(){
//     setTimeout(()=>{
//         console.log('生个Baby');
//     },500)
// }
// xq()
// .then((res)=>{
//     console.log(res);
//     return marry()
// })
// .then(()=>{
//     baby()

// })






// function xq(){
//     //返回了一个promise的实例对象
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('龙哥相亲了!');
//             resolve('相亲成功啦！')//里面的参数可以传给then(随便加一个形参),抛出一个值
//             //resolve()不用你传，源码已经打造好了，直接用
//         },2000)
//     })//promise是ES6新增加的构造函数，要new一下
    
// }
// function marry() {
//         setTimeout(()=>{
//             console.log('龙哥结婚了');
//             console.log('结婚完成了')
//         },1000)
// }

// xq()
// .then((res)=>{
//     console.log(res);
//     marry()
// })







// function xq(){
//         setTimeout(()=>{
//             console.log('龙哥相亲了!');
//         },2000)
    
// }
// function marry() {
//         setTimeout(()=>{
//             console.log('龙哥结婚了');
//         },1000)
// }
// xq()
// marry()