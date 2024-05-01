let arr = [5,3,6,4,1,2,9,7];

 function insertSort(arr){
    let temp
    for(let i=1; i<arr.length; i++){
        temp = arr[i];
        let j = i
        while(arr[j-1]>temp&&j>0){
            arr[j] = arr[j-1]
            j--
        }
        arr[j] = temp
    }
    return arr
 }