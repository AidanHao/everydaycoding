// var jud = /[^a-b]/：定义一个正则表达式jud，该表达式匹配任何不包括在a到b之间的字符。也就是说，它可以匹配任何一个大写字母或小写字母以外的字符。
//匹配test()
// var str = 'aaaa'
// var jud = /[^a-b]/
// var result = /[a]/.test(str)
// console.log(result)


//代替replace()
// var str = 'a/bc142'
// var result = str.replace(/[a-zA-Z1-9]/g,'')/*g表示全局匹配*/
// console.log(result)

//seach()

var str = 'a12b4cou/'
var result = str.match(/\d/g)
console.log(result)
