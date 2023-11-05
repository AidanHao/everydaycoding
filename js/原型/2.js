// Car.prototype.name = '春风'
// Car.prototype.lang = 4900
// Car.prototype.height = 1400
function Car(owner,color){
    // this.name = '春风'
    // this.lang = 4900
    // this.height = 1400
    //以上是不可以修改的
    this.owner = owner
    this.color = color
}
Car.prototype={
    name:'春风',
    lang:'4900',
    height:'1400'
}//这样设置的对象是后天你生成的，与先天的还是有点区别
var car1 = new Car('浪鸽','green')
var car2 = new Car('犄角','pink')
car1.name = '宝马'
console.log(car2.name)
console.log(car1)
