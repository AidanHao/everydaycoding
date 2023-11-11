// let str = 'abcdefg'
// console.log(str[2]);
// console.log(str.at(2));//接收一个下标，取对应下标的值
// console.log(str.startsWith('a'));//判断字符串是不是以什么开头
// console.log(str.includes("ad"));//判断字符串是否包含
// console.log(str.padStart(8,'0'));//把字符串长度怼到8，不足就往前面补0，往头部补  padEndw往后面补

let obj = {
    a:1,
    b:2
}
console.log(obj.toString());
console.log(obj);
// console.log(JSON.stringify(obj));//JSON是自带的对象，把对象转字符串
let str = JSON.stringify(obj)
console.log(JSON.parse(str));//parse把变为字符串的对象，转为对象