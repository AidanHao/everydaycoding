let arr = [2 , 3, 1,4,5]
// arr.sort((x,y)=>x-y)


// function bubbleSort(arr){
    // let res = []
    // while(arr.length)
    // {
    //     let min = getmin(arr)
    //     res.push(min)
    //     arr.splice(arr.indexOf(min),1)
    // }
    // return res
    // const len = arr.length
    // for(let i = 0;i<len;i++){
    //     for(let j = i+1;j<len;j++){
    //          if(arr[i]>arr[j]){
    //             let temp = arr[i]
    //             arr[i] = arr[j]
    //             arr[j] = temp
    //          }
    //     }
    // }
    // return arr
// }
// function getmin(arr){
//     let min = Infinity
//     for(let i = 0;i<arr.length;i++){
//         if(arr[i]<min){
//             min = arr[i]
//         }
//     }
// }




function bubbleSort(arr){
    const len = arr.length
    for(let i = 0;i<len;i++){
        for(let j = i+1;j<len;j++){
             if(arr[i]>arr[j]){
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
             }
        }
    }
    return arr
}
console.log(bubbleSort(arr));