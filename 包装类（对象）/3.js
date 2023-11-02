// 对象的创建
// 1. var obj = {}//对象字面量||对象直接量
// Object()//构造函数
// 2. var obj = new Object();
// 3. 自定义构造函数
// 4. Object.create({})
function Car(color){
    this.name = 'BMW'
    this.height ='1400'
    this.lang = '4900'
    this.weight =1000
    this.color = color
}
// let car1 = Car() 其中car1有没有值取决于Car()有没有返回值
// 构造函数就像工厂，可以批量化生产
// 函数也是引用类型，可以说成是一种特殊的对象
 let car1 = new Car('pink') //实例对象
 let car2 = new Car('green')
 console.log(car1)
 console.log(car2)