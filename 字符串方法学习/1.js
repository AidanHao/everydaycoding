//charAt(index)
// var str = 'hello'
// var result = str.charAt(2)
// console.log(result)

//concat(string2, string3..., stringX)
// var str1 = 'hello '
// var str2 = 'this '
// var str3 = 'is me'
// var result = str1.concat(str2,str3)
// console.log(result)

//indexOf(searchValue[, fromIndex]): 返回指定字符或子串第一次出现的位置
// var str = 'hello i am Js'
// var result = str.indexOf('am')
// var result2 =   str.indexOf('ok')
// console.log(result)
// console.log(result2)

//lastIndexOf(searchValue[, fromIndex]): 返回指定字符或子串最后一次出现的位置。
// var str = 'hello,hello,hello'
// var result = str.lastIndexOf('hello')
// var result2 = str.lastIndexOf('str')
// console.log(result)
// console.log(result2)

//slice(startIndex[, endIndex]): 提取字符串的一部分并在新的字符串中返回被提取的部分
// var str = 'hello,hello,hello'
// var result = str.slice(4,25)
// console.log(result)

//substring(startIndex[, endIndex]): 提取字符串中两个指定的索引号之间的字符。
// var str = 'hello,hello,hello'
// var result = str.substring(4,7)
// console.log(result)

//toUpperCase(): 将所有字符转换为大写
// var str = 'hello,hello,hello'
// var result = str.toUpperCase()
// str.toUpperCase()
// console.log(str)
// console.log(result)

//toLowerCase(): 将所有字符转换为小写。
// var str = 'HELLO,HELLO,HELLO,HELLO'
// var result = str.toLowerCase(str)
// console.log(result)

//replace(searchValue, replaceValue): 用新字符串替换字符串中的所有匹配项。
// var str = 'hello i am  js'
// var result = str.replace('hello','你好')
// console.log(result)

//trim(): 移除字符串两端的空格。
// var str = ' hello '
// var result = str.trim()
// console.log(result)

//  charCodeAt(index)方法
// var str = 'abcd'
// var result = str.charCodeAt(0)
// console.log(result)

//split()分割字符串
var str  = 'hello'
var result = str.split('')
console.log(result)