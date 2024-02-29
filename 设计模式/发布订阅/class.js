// // 普及一下构造函数方法
// function Point(x,y){
//     this.x = x;
//     this.y = y;
// }
// // 让p继承一些方法，在构造方法的原型上添加属性
// // 这是ES5的写法 和java等面向对象语言差距比较大
// Point.prototype.toString = function(){
//     return `(${this.x},${this.y})`
// }
// // 特别的地方 foo不在构造函数的原型上，所有p继承不到foo 实例对象的隐式原型等于构造函数的显示原型
// Point.foo = function(){
//     return 'foo'
// }
// let p = new Point(1,2)


//在ES6增加了一个类的概念
class Point {
    // 类就是构造函数的变种 在类里面所有的this都指向这个类本身
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    // 加一个get关键字 可以直接p.toString 就可以当属性使用
    get toString(){
        return `(${this.x},${this.y})`
    }
    // 让实例对象访问不到foo 加一个static 静态方法
    static foo(){
        return 'foo'
    }
}

let p = new Point(1,2)

console.log(p.toString());




// 新语法 可以省略constructor 但是要加变量名钱要加_
// 例如ref
class Point{
    _count = 0
    get value(){
        // _可以不加，但是官方推荐加_
        return this._count
    }

    set value(val){
        console.log(val,'----');
        this._count = val
    }
}
let p = new Point()
// console.log(p.value);
// 赋值语句会触发set 读值读get
p.value = 1