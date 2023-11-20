// var arr = [1,[2,[3,4]]]//[1,2,3,4]
//还有什么手段能实现扁平化呢？

// var arr = [1,2,3,4,5,6,7,8,9,10,11]

// //reduce方法很好做累加
// var sum=arr.reduce(function(pre,item,index,arr){//reduce是有返回值，reduce结束的时候会返回pre的值
//     // console.log(pre,item)//return 一定给到pre
//     return pre+item
// },0)
// console.log(sum)


var arr = [1,[2,[3,4]]]//[1,2,3,4]
function flatten(arr){
   return arr.reduce(function(pre,item){
       return pre.concat(Array.isArray(item)?flatten(item):item)//三元运算符
    },[])
}
console.log(flatten(arr));