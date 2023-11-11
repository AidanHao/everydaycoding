//set是类数组也可以说对象
//数组当中可以存放相同的值
//对象当中不能存重复的key值
// let arr = [1,2,3,4,5]
// let obj = {
//     a:1,
//     b:1,
//     c:1
// }

//set没有符合表达
// let set = new Set([1,2,3,4,5])//接收的参数是数组
// console.log(set);
// // console.log(set[0]);读不到值，不能用传统对象和数组的方法来读取值,下标对我们一点用没有
// console.log(set.keys());
// console.log(set.values());


//类数组，长得像数组，但是用的是花括号
//一个对象中直接装值就是set结构  有下标也可以说下标为key
//set有size属性



// let set = new Set([1,1,2,2,3,4])
// set.add(5)
// console.log(set);
// console.log(set.size);


//数组去重 能去字符串，数字，不能去对象，函数
// var arr = [1,2,3,2,1,4,'a','a']

// var unique = (arr)=>[...new Set(arr)]//相当于加了花括号和return

// function unique(arr){
//     // return Array.from(new Set(arr))

//     // return [...new Set(arr)]

//     // let s = new Set(arr)
//     // let result = Array.from(s)//把一个类数组转换为数组
//     // return result
// }
// console.log(unique(arr));



let set = new Set([1,2,3]);





//entries()即返回键名又返回键值
// for(let item of set.entries() ){
//     console.log(item);
// }



//set具有迭代器属性
//keys是用来返回所有键名的，具有迭代器属性
//value是用来返回所有的键值的，也具有迭代器属性
// for(let item of set.keys() ){
//     console.log(item);
// }
// for(let item of set ){
//     console.log(item);
// }



// console.log(set);
//Iterator迭代器 面试，[[scope]]不能访问的属性，Iterator内置的属性，拥有迭代器属性的结构才能被遍历，
// console.log(set.keys());


// 是否包含括号当中的值
// console.log(set.has(2));


//forEach不再是数组独有的方法了
//遍历方法
// set.forEach((item,index,set)=>{
//     console.log(item,index,set);
// })

// set.add(5)
// set.clear()
// set.delete(1)//删除括号当中的值
// console.log(set);