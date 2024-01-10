// const num1 = 5 //101
// const num2 = 3 //011
// // 按位异或用于数据加密
// const res = num1 ^ num2 //110

let num1 = 5//101
let num2 = 7//111
 num1 = num1 ^ num2
 num2 = num1 ^ num2
 num1 = num1 ^ num2
//  (a ^ b ) ^ b = a

console.log(num1,num2);