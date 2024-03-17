// function instanceOf(left, right) {
//   // 如果右操作数不是函数，则直接返回false
//   if (typeof right !== 'function') {
//     return false;
//   }

//   // 从左操作数开始，沿原型链向上查找
//   let proto = Object.getPrototypeOf(left);
  
//   while (proto !== null) {
//     // 如果找到了右操作数的 prototype 属性在原型链上，则返回true
//     if (proto === right.prototype) {
//       return true;
//     }
    
//     // 继续向上查找
//     proto = Object.getPrototypeOf(proto);
//   }

//   // 如果循环结束都没有找到，则返回false
//   return false;
// }

// function instanceOf(left, right) {
//   if(typeof right !== 'function') return false;

//   let proto = Object.getPrototypeOf(left);

//   while(proto){
//     if(proto === right.prototype) return true;
//     proto = Object.getPrototypeOf(proto);
//   }

//   return false;
// }


function instanceOf(left,right){
  if(typeof right !== 'function') return false;

  let proto = Object.getPrototypeOf(left);
  while(proto){
    if(proto === right.prototype){
      return true;
    }else{
      proto = Object.getPrototypeOf(proto);
    }
  }
  return false;
}



let fn = function(){

}

console.log(instanceOf({},Object));
console.log(instanceOf([],Array));
console.log(instanceOf(123,Number));
console.log(instanceOf(false,Boolean));
console.log(instanceOf(fn,Number));
console.log(instanceOf(123,123));




