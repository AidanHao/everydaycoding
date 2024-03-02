// function* g(){
//     let a = 1
//     let b=yield a++
//     console.log(b);
//     let c = yield a++

// }
// let gen = g()
// console.log(gen.next());// 1
// console.log(gen.next(3));//next可以接一个参数，用我指定被我触发的yield的结果 
// // console.log(gen.next());// undefined

// next
function* g(){
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
}
// for..of就是会自动调用next 
for (let val of g())
{
    console.log(val)
}