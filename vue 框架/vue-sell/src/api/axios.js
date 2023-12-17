import axios from "axios";

// const baseUrl = 'http://ustbhuangyi.com/sell/'
const baseUrl = ''//做了代理这里就不用写了


export function get(url){
    return function(params = {}){
        // baseUrl是前半段
        return axios.get(baseUrl + url, {
            // 这是向后端传递的参数
            params
        }).then(res=>{
            // 对象的解构
            const {errno,data}=res.data
            // errno==0代表没有错误
            if(errno===0){
                return data
            }
        }
        )
    }
}
// 抛出
// export default get

// 为什么resFn可以使用点then 因为resFn调用get里面返回了一个函数，这个函数里面又返回了一个axios，而axios默认封装了promise
// let resFn = get('seller')
// resFn.then(data=>{

// })
// get('/seller')只要传路径的后半段，拿到完整路径
// get('/seller')()