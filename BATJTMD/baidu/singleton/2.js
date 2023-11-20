//es6 class 企业级开发，大型项目，学java
class SingleDog{
    //公共方法是属于对象的
    show(){
        console.log('我是一个单例对象');
    }
    //不要直接new
    static instance
    static getinstance(){
        //返回这个方法的唯一一次new
        // console.log('静态方法');
        if(!SingleDog.instance){
            SingleDog.instance = new SingleDog();

        }
        return SingleDog.instance;
    }
}
//类的方法
let s1 =SingleDog.getinstance()
let s2 =SingleDog.getinstance()
console.log(s1===s2);
//当一个方法被声明为静态方法的时候，类的方法，可以直接调用
//静态方法是属于类的
// new 过程 不同的内存 如何返回同一个内存
// s1 s2 里的值是地址
// 同一个地址 先生成地址 然后再new 去判断一下 如果已经有了，就不用再new了
// if else 
// 单例模式 
// const s1 = new SingleDog();
// const s2 = new SingleDog();