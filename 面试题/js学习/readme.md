# js数组的方法
1. 增：push unshift splice concat(不影响原数组，返回新数组) 
2. 删：pop shift splice(影响原数组，返回删除的元素) slice(不会影响原数组，返回删除的元素)
3. 改：reverse sort splice 
4. 查：indexOf(没有就是-1) lastIndexOf(返回索引) includes(有就是true，没有就是false) find(返回第一个符合条件的元素,接收一个回调)
5. 遍历方法： 
        map forEach(要拿到原数组进行操作 return 终止不了forEach)  
        filter(返回符合条件的元素,接收三个参数，返回一个满足条件的新数组)
        every并且关系 
        some 或的关系
        reduce(比较特殊 接收两个参数，第一个为回调，第二个为初始值，这个回调函数接收四个参数，第一个参数是上次遍历得到的结果然后是item，i，arr pre没有初始值会挤掉别人的值)

6. 转换：join(将数组转换为字符串)，数组上面的toString是重写了的方法

- forEach map 的区别
1. map 会返回一个新的数组
2. return 无法终止forEach的循环，forEach 没有break 没有continue  forEach 是数组遍历最复杂的遍历方法

# 2. 字符串有哪些方法？
1. 增：concat(不会影响原字符串，返回新字符串)  padStart padEnd
2. 删：slice  subString(两个下标，左闭右开) substr(返回删除的内容 两个参数下标 长度)
3. 改：
    replace(第一个参数是正则，第二个参数是替换的内容) 
    repeat(重复) 
    trim(去除首尾空格) 
    trimLeft(去除左边的空格) 
    trimRight(去除右边的空格) 
    toLowerCase(转小写) 
    toUpperCase(转大写)
    toLocalLowerCase(转小写 基本没有区别 设计到本地语言)

4. 查
    indexOf(没有就是-1)
    lastIndexOf(返回索引)
    includes(有就是true，没有就是false)
    charAt(返回指定位置的字符 相当鸡肋)
    startsWith(第一个参数是字符串，第二个参数是字符串，第三个参数是起始位置，返回布尔值 判断某个字符串是否以某个字符为开头的)
    endsWith(第一个参数是字符串，第二个参数是字符串，第三个参数是起始位置，返回布尔值 判断某个字符串是否以某个字符为结尾的)
    
5. 转换
    charCodeAt
    split


# 3. == 和 === 的区别？
    == 会发生隐式类型转换 === 不会做类型转换
    Array中的toString是被重写了的方法 不是对象的toString
    == 是判断值相等
# 4. 隐式类型转换 说说类型转换
- 什么是类型
js中有原始类型 和 引用类型 的区分

- 有显示类型转换和隐式类型转换
    1. 显示类型转换 一般直接调用构造函数，开发中通常需要将一个类型转为另一个类型时通过调用构造函数实现显示类型转换
    2. 隐式类型转换 当开发中碰到 比较运算符 或者 算术运算符 时 当符合两边的数据类型不一致时，js引擎会自动进行隐式类型转换