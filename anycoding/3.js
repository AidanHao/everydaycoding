// 通过reduce方法实现map
Array.prototype.myMap = function(fn){
    let newarr = []
    this.reduce((a,b,c)=>{
        let item = b
        let index = c
        let arr = this
        newarr.push(fn(item,index,arr))
    },0)
    return newarr
}
let arr1 = [5,6,7]
let arr2 = arr1.myMap((item,index,arr)=>{
    arr[index]++
    return --item
})
console.log(arr1,arr2);