let arr = [9,8,7,6,5,4,3,2,1,0]

function quickSort(arr){
    if(arr.length ==0){
        return []
    }
    let base = arr[0]
    let left = []
    let right = []
    for(let i = 1; i < arr.length; i++){
        if(arr[i]>=base){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return [...quickSort(left),base,...quickSort(right)]
}
console.log(quickSort(arr));