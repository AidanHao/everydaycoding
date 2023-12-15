// http由这个模块提供 @是短链接
import http from '@/utils/http';
// 模块，前后端 交流 数据模块的封装
// localhost:3000/banner 有轮播图的数据 怎么引入到vue当中？
// 轮播图

// 这是数据接口
export async function getBanner(){
    // await请求，可以等待
    // get 请求 统一 http  
    const { banners } = await http.get('/banner',{type:1})
    return banners
}

//负责搜索
export async function getSearchSuggest(keywords){
    const { result } = await  http.get('/search',{keywords})
    return result
}