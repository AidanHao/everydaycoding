//一道面试题 
var arr = [1,[2,[3,4]]]//[1,2,3,4]

let newArr =arr.flat(Infinity)//会返回一个新数组,flat数组的扁平化,Infinity无穷大
console.log(newArr) 