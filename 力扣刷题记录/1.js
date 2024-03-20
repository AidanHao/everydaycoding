const promise= new Promise((resolve, reject) =>{
    console.log(1);
    setTimeout(()=>{
        console.log(6);
        setTimeout(()=>{console.log(8);},0)
        resolve('sucesss')
        console.log(7);
    },0)
    console.log(2);
})
setTimeout(()=>{
    console.log(5);
},0)
promise.then((res)=>{
    console.log(res);
})
console.log(4);