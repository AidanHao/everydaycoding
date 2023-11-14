// let obj = {name:'艾欧尼亚'}//占据全局执行上下文中的内存
// console.log(obj.name);//到这里垃圾回收机制不会回收掉obj，只有后面再也没人用才会回收
// //执行完就会被清理掉
// //在js中垃圾回收机制是自动的
// //c语言的垃圾回收机制是手动的

// let obj = {name:'德玛西亚'}
// //垃圾回收机制不考虑WeakSet对对象的引用,
// let ws = new WeakSet()//只能存symbol和对象
// ws.add(obj)
// // obj = null//这样直接就会被垃圾回收机制回收掉,把obj声明为可以被回收的值
// //浏览器的垃圾机制是不受我们掌控的，我们不知道什么时候会把它回收掉，垃圾回收机制的执行机时间是不受我们掌控的
// //如果，下面没有有效应用，obj就会被销毁
// console.log(ws);//{}

// let obj = {name:'锐雯'}
// let wm = new WeakMap()
// console.log(wm.set(obj,5));//输出：WeakMap { <items unknown> }




// let weakset = new WeakSet();
// var obj = new Object()
// weakset.add(obj)//不报错
// weakset.add(Symbol())//不报错
// weakset.add(1)//报错



// let weakMap = new WeakMap();
// let key = {};
// let value = '你好';

// weakMap.set(key, value);
// console.log(weakMap.has(key)); // 输出：true
// console.log(weakMap.get(key)); // 输出：'你好'
// // 当键对象被销毁后，WeakMap 也会自动删除对应的键值对
// key = null;
// console.log(weakMap.has(key)); // 输出：false
// console.log(weakMap.get(key)); // 输出：undefined