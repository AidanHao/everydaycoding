// 假设着是接口请求
function request(num){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(num * 10)
        },1000)
    })
}
const res1 = request(1)
const res2 = request(res1)


function* gen(){
    const num1 = yield request(1)
    const num2 = yield request(num1)
    const num3 = yield request(num2)
    return num3
}
let g = gen()
const next1 = g.next()
next1.value.then((res1)=>{
    const next2 = g.next(res1)
    next2.value.then((res2)=>{
        const next3 = g.next(res2)
        next3.value.then((res3)=>{
            console.log(res3)
        })
    })
})



// async function fn(){
//     // await会把promise中resolve的值返回给res1
//     const res1 = await request(1)//await后面的代码会以同步执行，await下面的代码会被await推入到微任务当中
//     const res2 = await request(res1)
//     console.log(res2);
// }
// fn()
