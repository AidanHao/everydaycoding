Car.prototype.name = '春风'
Car.prototype.lang = 4900
Car.prototype.height = 1400
function Car(owner,color){
    // this.name = '春风'
    // this.lang = 4900
    // this.height = 1400
    //以上是不可以修改的
    this.owner = owner
    this.color = color
}
var car1 = new Car('浪鸽','green')
var car2 = new Car('犄角','pink')
// car1.name='川崎'
//实例对象是无法修改原型的
//原型修改方法,只能通过构造函数调用自己的原型修改
// Car.prototype.name = '川崎'
//实例对象是删不了原型上的属性的
// delete car1.name
// delete Car.prototype.name
// 
console.log(car1.name)
console.log(car2.name)
