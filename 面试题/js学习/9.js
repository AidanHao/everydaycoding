




// let num = [
//     1,2,
//     [1,2,3,[888,999]],
//     [1,5,6]
// ]

// function bian(arr){
//     let res = []
//     for(let i = 0;i<arr.length;i++){
//         if(typeof arr[i] !=='object'||arr[i] == null){
//             res.push(arr[i])
//         }else{
//             res.push(...bian(arr[i]))
//         }
//     }
//     return res
// }
// console.log(bian(num));