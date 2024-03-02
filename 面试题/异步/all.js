function a(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('a');
            // resolve('a')
            reject('a')
        },1000)
    })
}
function b(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('b');
            // resolve('b')
            reject('b')
        },500)
    })
}
function c(){
    console.log('c');
}
// all方法挂在函数上,如果a,b都为fulfilled，all的状态就是fulfilled 如果有一个是rejected 那么all就是rejected
// Promise.all([a(),b()]).then(res=>{
//     c()
// },
// (err)=>{
//     console.log(err);
// })

Promise.any([a(),b()]).then(res=>{
    c()
},
(err)=>{
    console.log(err);
}
)