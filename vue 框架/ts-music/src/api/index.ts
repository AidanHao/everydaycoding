//没有使用，也会警告
import type {Banner} from '../models/banner';
import type {Personalized} from '../models/personalized';//es6 引入类型。
import http from './http.ts';

//ts 有完整的编译阶段 ts->js>run
// 后端api的接入口 业务代码 有广告位
export async function useBanner(){
    //前端也有数据效验了,要说不，为用户负责 ts 接口
    // http.get <> 泛型 约束一下返回值的类型，Banner 数组 
    // const {banner} = await http.get<banners:Banner[]>('/banner',{type:1})
    //resolve()
    const {banners} = await http.get<{ banners:Banner[] }>('/banner',{type:1})

    return banners
}
// 看接口文档 亮度 JSDOC 生成 后端写给前端看的 前后端 分离
// api/index.ts 中加一个业务方法
// 为了大型项目，前端模型层 后端的数据就不怕不规范了 参考文档 + 前端的需求
// pinia + model 为了让数据更安全的
export async function usePersonalized(){
    //前端也有数据效验了,要说不，为用户负责 ts 接口
    // http.get <> 泛型 约束一下返回值的类型，Banner 数组 
    // const {banner} = await http.get<banners:Banner[]>('/banner',{type:1})
    //resolve()
    // <>这个叫泛型，result:Personalized[]定义一个实参 
    const {result} = await http.get<{ result:Personalized[] }>('/personalized')

    return result
}