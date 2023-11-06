var Foo = ()=>{

}
console.log(new Foo())//这里会报错，箭头函数不承认this，new使用的是构造函数，构造函数一定有this，箭头函数不能被当作this