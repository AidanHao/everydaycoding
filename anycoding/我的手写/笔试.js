// // 输入一个十进制字符串代表的整数，求让其+上一个数字，使其成为一个回文数

// function getResult(str){
//     if(str.length === 0){
//         return 0;
//     }
//     let arr = str.split('');
//     let start = 0; 
//     let end = arr.length - 1;
//     let result = 0;
//     while(start < end){
//         if(arr[start] > arr[end]){
//             result+=(arr[start] - arr[end])*Math.pow(10, arr.length- 1 - end);
//         }else if(arr[start] < arr[end]){
//             result += (arr[end] - arr[start])*Math.pow(10, end - start);
//         }
//     }

// }
