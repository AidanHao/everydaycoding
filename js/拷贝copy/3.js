//浅拷贝的实现原理
let obj = {
    name:'小黑',
    age:18,
    like:{
        type:'coding'
    }
}
let arr = ['a',{n:1},1,undefined,null]

function shalldowCopy(obj){
    // let objcopy = {}
    // if(obj instanceof Array)
    // {
    //     objcopy=[]
    // }
    if(typeof obj !== 'object' ||obj ==null) return //只拷贝引用类型！
    let objcopy = obj instanceof Array ? []:{}

    for(let key in obj)
    {
        if(obj.hasOwnProperty(key))
        {
            //不能写. 写.会直接变为字符串，我们要读的是变量
            objcopy[key] = obj[key]
        }
    }
    return objcopy
}
let newObj = shalldowCopy(obj);
// obj.age = 20//因为age是原始类型，所以拷贝的时候，是深拷贝
obj.like.type = 'swimming'//key为like，读到的就是引用地址!
console.log(newObj);

//这样是盖板，还有很多种情况，多加点if语句