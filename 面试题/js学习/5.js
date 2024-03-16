// let a = 1
// let b = a
// a = 2
// console.log(b);

// let a = {
//     age:18
// }

// // let b = Object.create(a)//继承

// // assign 浅拷贝

// let b = Object.assign({},a)
// a.age = 20
// console.log(b);

// let a = [1,2,{n:3}]
// // 浅拷贝
// // let b = [...a]
// // let b = [].concat(b)
// // let b = a.slice(0)

// a[2].n = 30
// console.log(b);


// 深拷贝
// 缺点：无法解决循环引用，无法复制Symbol 函数 undefined BigInt

// let a = [1,2,{n:3}]

// // b = JSON.parse(JSON.stringify(a))
// let b = structuredClone(a)

// a[2].n = 30
// console.log(b);


let fn = function(){
    console.log('hello,world');
}

function copy(fn){
    let foo = fn.toString();
    // return new Function(`return ${fn}`)
    // return new Function(`return ${fn}`)()
    return new Function(`return ${foo}`).call(fn)

}

let foo = copy(fn);
foo()()
console.log(foo);