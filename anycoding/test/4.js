let fn =  new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('请求发送完毕');
    resolve()
    }
    ,1000)
})
    

let delay = 500
// fn - 请求
function timmer(fn,delay){
    return new Promise((resolve,reject)=>{
        let time = Date.now()
        fn().then(()=>{
            if(Data.now()-time <delay){
                console.log('成功');
                resolve()
            }else if(Data.now()-time >delay){
                reject()
            }
        })
    })
}
timmer(fn,delay).then(()=>{
    console.log('成功');
},()=>{
    console.log('失败');
})






// // [{a:1,b:2,c:3}] =>[['a',1],['b',2],['c',3]]
// function change(arr){
//     let newarr = []
//     for(let key in arr[0]){
//         newarr.push([key,arr[0][key]])
//     }
//     return newarr
// }
// // console.log(change([{a:1,b:2,c:3}]));

// // ['a','a','a','b','b','c'] => [['a',3],['b',2],['c']]
// // function change2(arr){
// //     let newarr = []
// //     let jud = {}
// //     for(let i = 0;i<arr.length;i++)
// //     {
// //        if(!jud[arr[i]])
// //        {
// //         jud[arr[i]] = 1
// //        }else{
// //         jud[arr[i]]++
// //        }
// //     }
// //     for(let key in jud)
// //     {
// //         if(jud[key]>1)
// //         {
// //             newarr.push([key,jud[key]])
// //         }else
// //         {
// //             newarr.push([key])
// //         }
// //     }
// //     return newarr
// // }

// let obj = {
//     w:10,

// }

// function area(obj){
//     let {w,l} = obj
//     console.log(w,l);
//     if(obj.w && obj.l){
//         return obj.w*obj.l
//     }else{
//         return obj.w?obj.w:obj.l
//     }
// }

// console.log(area(obj));