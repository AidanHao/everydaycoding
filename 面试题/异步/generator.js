// function* foo(){//加一个*，我们就称这个foo为生成器generator函数 会有一个yield关键字 
// //     let a = 0
// //     yield a = 1
// //     yield a = 2
// //     // console.log(a);
// //     return a
//     // yield 'a'
//     // yield 'b'
//     // yield 'c'
//     // // 没有return这个函数就不会终止，只要读到了yield就算是暂停了
//     // return 'ending'


// }
// // 所谓处理异步，就是我们要有一个能力控制一部分代码不执行
// // console.log(foo());

// let gen = foo()//foo()的执行是得到一个Generator的实例对象，不会去执行这个这个Generator函数
// console.log(gen.next());//{ value: 'a', done: false } 点一下next就是往下走一步
// console.log(gen.next());//{ value: 'a', done: false } 此时执行到了第二yield来了
// console.log(gen.next());//{ value: 'c', done: false }
// console.log(gen.next());//{ value: 'ending', done: true } 再往下执行，就拿不到value了，但是函数是执行完了 return 直接意味着终结



function* g(){
    var o = 1
    yield o++
    yield o++
    yield o++
}
let gen = g()// generator 迭代对象
// next函数从上往下读，直到读到第一个yield 并且会读到yield后面接的表达式的值
console.log(gen.next())//{value:'1',done: false} nenxt意味着会卡在当前这个语句当中

let gener = g()
console.log(gener.next())// 1