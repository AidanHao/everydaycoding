// let a = 'hello'
// let b = 'world'
// let c = a+b//这个叫字符串拼接，也叫模板拼接
// console.log(c);

let date = new Date()//得到一个时间
//时间自带方法 getFullYear()返回年 getMonth()返回月(0月-11月比我们小一个月+1就是我们的月份了)，getDate(读取日)
// let time = date.getFullYear()+'年'+(Number(date.getMonth()+1))+'月'+date.getDate()+'日'
// 这个+date.getMouth()转换为Number
let t = `${date.getFullYear()}年${+date.getMonth()+1}月${date.getDate()}日`
// let c = a+b//这个叫字符串拼接，也叫模板拼接
// console.log(time);
console.log(t);