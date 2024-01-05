import {createStore,createLogger} from 'vuex'//createLogger会把每一笔数据修改打印出来
import cart from './modules/cart'
import products from './modules/products'


// 调用返回的是一个对象 是一个Store的实例对象，是Store的单例对象，用的是状态树的解构管理数据
// 这里是一个单一状态树
export default createStore({
    modules:{
        cart,
        products,
    },
    plugins:[createLogger()]//添加插件
})