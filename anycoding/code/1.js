const Promise = ()=>{
    return new Promise(()=>{
        console.log('2');//2
        setTimeout(()=>{
            console.log('5');//5
            setTimeout(()=>{
                 console.log('6');           //6
            })
        })
        resolve(4)//
        console.log();
    })
}
console.log('1');//1
setTimeout()//4
Promise.then((res)=>{
    console.log(res);//4
})

console.log();//3