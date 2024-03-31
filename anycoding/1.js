// let a = 'sd'
// console.log(typeof a);
// let b = []
// console.log(b instanceof Array);

let mytry = function(){
    return new Promise((resolve,reject)=>{
        console.log(0);
        resolve(1)
        setTimeout(()=>{
            resolve(2)
        },1000)
    })
}
mytry().then((res)=>{
    console.log(res);
    return new Promise((resolve,reject)=>{
        resolve(3)
    })
}).then((res)=>{
    console.log(res);
})