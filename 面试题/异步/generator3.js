var co = require('co')
function a(next){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('a完成');
            // next()
            resolve()
        },1000)
    })
    
}
function b(next){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('b完成');
            // next()
            resolve()
        },500)
    })
    
}
function c(){
    console.log('c完成');
}


function* g(){
    yield a()
    yield b()
    // yield c
}

// co模块
co(g).then(()=>{
    console.log('generator执行完毕');
})


// Thunk generator的自动化管理，如果管理他的流程
// function run(fn){
//     let gen = fn()
//     function next(err,data){
//         let result = gen.next(data)
//         if(result.done) return
//         result.value(next)//a调用
//     }
//     next()

// }
// run(g)