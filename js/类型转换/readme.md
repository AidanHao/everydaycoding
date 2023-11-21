很恶心，规则很多，弯弯绕绕

# 基本数据类型的转换
1. 转布尔值
2. 转数字
3. 转字符串
4. 转对象

# 对象转原始值
转null 和 转 undefined 没有意义

- 转字符串 调用的其实就是Object.prototype.toString()
1. {}.toString() 返回由"[object" 和 class(数据结构的内部属性) 和"]"组成的字符串
2. [].toString() 返回由数组内部元素以逗号拼接的字符串
3. xx.toString() 直接返回字符串字面量

下面是官方文档对    Object 调用toString的介绍
Object

Apply the following steps:

1. Let primValue be ToPrimitive(input argument, hint String).

2. Return ToString(primValue).

- valueOf 
1、 用于转换包装类


# TOPrimitive
ToPrimitive(obj,Number) ===> Number({})  先用valueOf转换 发现转换不了，用toString 成功，再就是原始值转原始值
js自己调用的方法
1. 如果obj是基本类型，直接返回
2. 否则，调用valueOf 方法，如果得到原始值，则返回
3. 否则， 调用toString方法，如果得到原始值，则返回
4. 否则， 报错

ToPrimitive(obj,toString) ===> String({})
1. 如果obj是基本类型，直接返回
2. 否则，调用 toString 方法，如果得到原始值，则返回  (假如，你再这个数据上重写了toString方法，导致访问不到Objcet下的toString方法)
3. 否则， 调用 valueOf 方法，如果得到原始值，则返回
4. 否则， 报错

所有的对象转布尔值都是true

# 对象转布尔都是true

# 一元运算符 + 直接往Number转

# 二元运算符 +
lprim + rprim

如果其中有一个是字符串，则返回字符串
二者本质都往Number上面转，前提是没有字符串，有字符串则会把他们都变成字符串再进行拼接
ToPrimitive(v1) + ToPrimitive(v2)
1. 当 + 号两边有一个是字符串，则按字符串进行拼接
2. 否则，转到Number 进行计算！

