// const num1 = 9 // 二进制 101
// const num2 = 3 // 二进制 011

// const res = num1 & num2
// const res2 = num1 | num2
// console.log(res);
// console.log(res2);
// console.log(res-res2);


// let num =16
// function jud(num){
//     while(num>=0)
//     {
//     if(num==2)
//     {
//         return true
//     }
//     num = Math.floor(num/2)
// }return false
    
// }
// console.log(jud(num));


const n = 8 // num = 2 ^ k 
function test(n)
{
    if(n<0) return false
    const i = n-1
    return (n&(n-1) )=== 0
}
console.log(test(n));