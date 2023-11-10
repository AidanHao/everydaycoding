# typeof
1. 可以准确判断除null之外的原始类型
2. 可以判断function
# instanceof 
1. 只能判断引用类型
2. 且是通过原型链查找来判断的
# Object.prototype.toString.call(xxx)
为什么执行得了？.call就相当于进行隐式绑定，悄悄把Object.prototype.toString搬到了xxx的身上

1. 如果this值为undefined，返回"[object Undefined]"。
2. 如果this值为null，返回"[object Null]"。
3. 将O作为ToObject(this)的执行结果
4. 让class成为 O 内部属性[[Class]]的值
5. 返回由三个字符串"[object "、 class 和 "]" 三部分拼接而成的字符串。

# Array.isArray(arr)函数自带的方法,用于判断是否为数组，数组独有
Array.isArray = function (arr) {}
function Array(){

}
let arr = []










If the this value is undefined, return "[object Undefined]".

If the this value is null, return "[object Null]".

Let O be the result of calling ToObject passing the this value as the argument.

Let class be the value of the [[Class]] internal property of O.

Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".翻译一下
这段代码是JavaScript的内置方法Object.prototype.toString()的实现原理概述。这个方法的目的是返回一个表示调用该方法的对象的字符串。

翻译如下：

如果this值为undefined，返回"[object Undefined]"。
如果this值为null，返回"[object Null]"。
将this值传递给ToObject方法，将结果赋值给O。
获取O的[[Class]]内部属性的值，赋值给class。
返回由三个字符串"[object "、class和"]"拼接而成的字符串。

简单来说，Object.prototype.toString()方法返回一个表示调用该方法的对象的字符串，包括"[object "、对象类型和"]"这三个部分。在具体实现中，首先判断this值是否为undefined或null，然后将其转换为对象类型，最后获取对象的类型并拼接成字符串返回。