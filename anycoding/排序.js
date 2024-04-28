let arr = [1,5,9,7,0,2,6,5,4,66,77,88,99,44,11,22]

// 冒泡排序
function selectSort(arr){
    for(let i = 0;i<arr.length-1;i++){
        for(let j = i+1;j<arr.length-1-i;j++){
            if(arr[j]<arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
}
// 选择排序
function chosenSort(arr){
    let temp = 0
    let minIndex = 0
    for(let i = 0;i<arr.length;i++){
        minIndex = i
        for(let j=i+1;j<arr.length;j++){
            if(arr[minIndex]>arr[j]){
                minIndex = j
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}
// 插入排序
function insertSort(arr){
    let temp
    for(let i = 1;i<arr.length;i++ ){
        temp = arr[i]
        let j = i
        while(j>0&&arr[j-1]>temp){
            arr[j] = arr[j-1]
            j--
        }
        arr[j] = temp
    }
}
// 快速排序
function quickSort(arr){
    if(arr.length <=1){return arr}
    const base = arr[0]
    let left = [],right = []
    for(let i = 1;i<arr.length;i++){
        if(arr[i]<base){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return [...quickSort(left),base,...quickSort(right)]
}


function PopSort(arr){
    for(let i = 0;i<arr.length-1;i++){
        for(let j = i+1;j<arr.length-i;j++){
            if(arr[j]>arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
}

function selectSort(arr){
    let minInndex = 0
    for(let i = 0;i<arr.length;i++){
        minInndex = i
        for(let j = i+1;j<arr.length;j++){
            if(arr[j]<arr[minInndex]){
                minInndex = j
            }
        }
        let temp = arr[i]
        arr[i] = arr[minInndex]
        arr[minInndex] = temp
    }
}