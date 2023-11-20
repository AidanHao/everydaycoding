//  let str = 'abcdefg'
// //查
// //  str[2] = 'C'
// //  str.charAt(4)
// // str.concat('mn') 不影响原字符串，生成一个新的字符串
// //  str + 'mn'直接加上
// //split分割字符串
// let arr = str.split('')//以什么东西将它切开,变为数组，生成新的数组
// arr.splice(4)//从下标4开始全部删除,会影响原来的数组
// let newstr = arr.join('')//将数组内容以什么内容拼接成一个新的字符串

//  console.log(newstr)
// let str = '2023年10月31日'
//reverse数组反转
// let str = 'juejin'
// let result = str.split('').reverse().join('')
// console.log(result)
// 判断是否回文
// const str = 'yesey'
// function ispallindrome(s){
//     const res = s.split('').reverse().join('')
//     return res === s
// }
// console.log(ispallindrome(str))
// 用栈的思想
// 全部入栈，出栈跟数组开头比
// const str = 'yesey'
// function ispallindrome(s){
//     const stack = []
//     for(let i = 0 ; i<s.length ; i++){
//         stack.push(s[i])
//     }
//     for(let i = 0; i<s.length ; i++){
//         if(s[i] !== stack.pop()){
//             return false
//         }
//     }
//     return true
// }
// console.log(ispallindrome(str))
// const str = 'yesey'
// function ispallindrome(s){
//     const len = s.length
//     for(let i = 0; i < len / 2 ; i++){
//         if(s[i] !== s[len - 1 - i]){
//             return false
//         }
//     }
//     return true
// }
// console.log(ispallindrome(str))  