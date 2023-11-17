// let arr = [1,3,4,5,6,7,8,9,10,11]
// //for...of是专门为具有迭代器属性的结构而存在的
// for(let item of arr){
//     console.log(item);
// }
let obj ={
    name:'小黑',
    age:18,
    like:{
        type:'coding'
    }
}


// let arr = [1,3,4,5,6,7,8,9,10,11]
// for(let key in arr){
//     console.log(arr[key]);
// }
//for ..in专门用来遍历对象的
// 对象不具备迭代器属性，不能用for .of遍历
// for(let key in obj){
//     console.log(obj[key]);
// }

//for in能遍历到隐式原型的属性,但是只能遍历到一层原型
//一般遍历不需要遍历隐式原型上的东西！
//我们可以去判断这个属性是否是显示具有还是隐式具有
//hasOwnProperty(key)判断是否是原本自身具有的,
// let data = Object.create(obj)
// data.sex = 'boy'
// for(let key in data){
//     if(data.hasOwnProperty(key))
//     {
//     console.log(data[key]);
//     }
// }



