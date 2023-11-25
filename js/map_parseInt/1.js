// - map 遍历 callback 返回值 生成一个新的数组
// 1 parseInt(1, 0, [1,2,3]) paseInt(值，进制的基数)这个值要能够解析，'14abc'=>14  'abc'=>NaN
// 2 parseInt(2, 1, [1,2,3]) NaN radix是进制，逢2进一
// 3 parseInt(3, 2, [1,2,3]) 2 011 NaN
// parseInt(string ?radix)将字符串解析位数字，？代表可以不传
console.log([1,2,3].map(parseInt));
// 为什么呢？冒泡排序一起作为一道考题