// 现在最流行的ajax请求库
import axios from "axios"
// fetch xhr vue应用时候，复用性，统一管理，我们做的是app而不是页面，需要统一管理
// 所有的请求前面加上baseURL地址
axios.defaults.baseURL = "http://localhost:3000";
// 接口可以有问题，超时十秒钟就报错
axios.defaults.timeout = 10*1000;
axios.defaults.maxBodyLength = 5*1024*1024;//图片 如果你上传的文件超过5mb就不让你上传！

const http ={
    get(url,params={}){
        // 能 await
        return new Promise((resolve,reject)=>{
            // xhr , fetch
            // axios 是http发送get请求的库
            // 请求的抽象
            axios
            .get(url, {params})
            .then((res)=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err.data)
            })
        })
    }
}

export default http;