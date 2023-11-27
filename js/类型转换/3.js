//一元运算符
//delete ? !
// console.log(+'1');//输出：1
// console.log(+[]);//输出：0
// console.log(Number.valueOf([]));
// console.log(+{});//输出:NaN
// +'1' 转换为 Number 1
// +[] 在内部方法中操作完之后 相当于 +'' 再调用to Number 结果是0
// +{} 结果是NaN

//二元运算符 例如a+b
console.log( 1 + '1');//11
//Number不传值都是0
console.log(1+null);//1
console.log([] + []);//空
//js中的隐式类型转换
console.log([] + {});//[object Object]


// console.log({} + {});//[object Object][object Object]
//在浏览器上要写成({} + {}) 
//如果不这样写的话{} +{} 会当成一元运算符来计算 , 前面就不管了，会输出NaN

//二元中的 ==
// if(1 == '1'){
//     console.log('ok');
// }