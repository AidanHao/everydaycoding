// const num = 5 //00000101
// console.log(num << 1);//00010100
// console.log(num >>1);



// 如何实现一个高效率的整数的乘法和除法

let a = 5
let b = 4

// 实现乘法
function multiply(x,y){
    let result = 0
    while(y >0)
    {
       
        if(y & 1)
        {//判断 y 二进制 最低为是不是1
            result += x
        }
           x= x << 1
           y= y >> 1
    }
    return result
}
console.log(multiply(5,4));

//实现除法
function divide(x,y){
    let result = 0
    
    return result+1
}



// function multiply(x,y){
//     let result = 0
//     while(y >0)
//     {
//        y= y >> 1
//         if(y & 1)
//         {//判断 y 二进制 最低为是不是1
//             result += x
//         }else{
//            x= x << 1
//         } 
//     }
//     return result+x
// }
// console.log(multiply(5,3));