let arr = ['a','b','c']
let str = 'sss'
for(let item of arr)//item代表数组里面的每一项,不是专门为数组服务的，只要具有迭代器属性的数据结构才能使用这个
{
    console.log(item);
}
//字符串具有迭代器属性
for(let item of str){
    console.log(item);
}