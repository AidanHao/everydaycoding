# 拷贝
通常只针对于引用类型！针对原始类型毫无意义

a = b 谈不上拷贝！


# 浅拷贝
新的对象受老的对象的影响
- 常见的浅拷贝方法:
1. object.create(x)
2. object.assign({},x)
3. concat
3. slice
5. 数组解构
6. arr.toReversed().reverse()


# 深拷贝
有一个偏门方法可以处理
- 常见的深拷贝方法：
 JSON.parse(JSON.stringify(obj))

- 缺点
1. 无法拷贝undefined，function，Symbol,BigInt这几种类型的数据
2. 无法处理循环引用！

引用类型的赋值是浅拷贝，原始类型是深拷贝，聊拷贝忽视原始类型   拷贝只针对引用类型