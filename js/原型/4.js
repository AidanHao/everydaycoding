function Bus(){

}
Car.prototype = {
    constructor:Bus
}
function Car(){

}
var car = new Car();
//constructor一定会在隐式继承中具有,在浏览器中隐式属性是颜色更淡，显式继承颜色更深
//constructor记录对象是由谁创建的,原型是可以修改的，constructor也是可以修改的
//(构造师)constructor给对象打个标记，表示谁是创建者
console.log(car.constructor)