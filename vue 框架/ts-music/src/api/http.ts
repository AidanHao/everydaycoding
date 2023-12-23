import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 10*1000;
//请求体上传最大大小不能超过5mb
axios.defaults.maxBodyLength = 5*1024*1024
axios.defaults.withCredentials = true;

//响应拦截
axios.interceptors.response.use(
    (response)=>response,
    function(error){
        return Promise.reject(error)
    }
)

interface Http{
    // ? 可选 unknown Promise 约束的是有返回值 难点和亮点 tailwind hook 编程 use typescript

    get<T>(url:string,params?:unknown):Promise<T>
}
const http:Http= {
    get(url,params){
        return new Promise((resolve,reject)=>{
            axios
            .get(url,{params})
            .then((res)=>{
                resolve(res.data)
            })
            .catch((err)=>{
                reject(err.data)
            })
        })
    }
}

export default http;