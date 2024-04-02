

function debounce(fn,delay){
    let timer= null
    return function(){
        if(timer){
            clearTimeout(timer)
        }else{
            timer = setTimeout(()=>{
                fn.apply(this,arguments)
            },delay
            )
        }
    }
}

function throttle(fn,delay){
    let timer = Date.now()
    return function(){
        if(timer-Date.now()>delay){
            fn.apply(this,arguments)
            timer = Date.now()
        }
    }
}

let obj = {
    '1':1,
    '2':{
        '3':3
    }
}
function deepcopy(obj){
    let newobj = Array.isArray(obj) ? []:{}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key] =='object'&&obj[key]!=null){
                newobj[key] = deepcopy(obj[key])
            }else{
                newobj[key] = obj[key]
            }
        }
    }

    return newobj
}
let obj2 = deepcopy(obj)
let a = '1'
obj.a = 2
console.log(obj);
console.log(obj2);

let str = 'abcd'
console.log(str.slice(0,1));

// function car(name){
//     this.name = name
// }
// function mynew(fn,...args){
//     let obj = {}
//     console.log(args);
//     console.log(...args);
//     obj.__proto__ = fn.prototype
//     let res = fn.call(obj,...args)
//     return res instanceof Object ? res:obj 
// }
// console.log(mynew(car,'宝马','奔驰','飞机'));
















// let a = 'sd'
// console.log(typeof a);
// let b = []
// console.log(b instanceof Array);

// let mytry = function(){
//     return new Promise((resolve,reject)=>{
//         console.log(0);
//         resolve(1)
//         setTimeout(()=>{
//             resolve(2)
//         },1000)
//     })
// }
// mytry().then((res)=>{
//     console.log(res);
//     return new Promise((resolve,reject)=>{
//         resolve(3)
//     })
// }).then((res)=>{
//     console.log(res);
// })

// const arr = [1,2,3,[4,[5,6]]]
// function mytry(arr){
//     let newarr = []
//     for(let item of arr){
//         if(item instanceof Array){
//             newarr= newarr.concat(mytry(item))
//         }else{
//             newarr.push(item)
//         }
//     }
//     return newarr
// }

// console.log(mytry(arr));



// function mytry(arr){
//     let newarr = new Array(arr.length)
//     for(let i = 0;i<arr.length;i++){
//         newarr[i] = []
//         newarr[i].push(arr[i])
//     }
//     return newarr   
// }
// console.log(mytry(arr))