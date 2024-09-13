let arr = [2,3,1,4,5]
function selectSort(arr){
    let minIndex
   for(let i = 0; i < arr.length-1; i++){
    minIndex = i
    for(let j = i+1;j< arr.length; j++){
        if(arr[j]<arr[minIndex]){
            minIndex = j
        }
    }
    let temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp 
   }
}
