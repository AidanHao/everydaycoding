// shop 包含怎样的理解？ 模块化
// 在大型项目中 index.js 入口文件 不负责接口的输出 一个模块的接口一个文件


//vuex 是状态管理的编程模式 数据操作分为 读|写 不能谁都能修改，要遵守一个流程
// 多个页面对一个数据进行修改会产生一个竞争关系
// 通过vuex统一管理修改操作 有一个流程 通过actions触发 -> mutations（回溯，就像记账一样）保证数据修改按照设定规则  
// 设计模式 这里有点难理解 有点复杂 慢慢被pinia取代了(独立于UI之外)

//前面加一个_表示不导出，私有的数据 这个数据只在本模块中使用
const _products = [
    { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
    { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
    { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
]

export default {
    //阅读后端接口文档，填写等下actions要调用的方法
    getProducts(cb){
        // 用定时器 模拟了ajax 请求要花时间
        // cb 又叫callback回调函数 原来是await getProducts
        // 将getProducts封装成为一个return promise 也是可以的
        setTimeout(()=>cb(_products),100)

    },
    buyProducts(products,cb,errorCb){
        setTimeout(()=>{
            // 随机的概念，类似于抛硬币 0.5概率成功 0.5概率失败
            (Math.random()>0.5)?cb():errorCb()
        },100)
    }
}