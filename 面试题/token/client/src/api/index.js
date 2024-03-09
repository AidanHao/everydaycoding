import axios from "axios";
import router from "../router/index.js"

// 只会在刷新的时候请求一次
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.baseURL = "http://localhost:3000";

// 请求拦截  把请求拦截下来并往请求头加入token 会在每次请求的时候都执行一次
axios.interceptors.request.use(
    (config)=>{
        let token = localStorage.getItem('token');
        // 直接去拿本地的token 如果有就直接挂载到请求头里面
        if(token){
            config.headers.Authorization= token
        }
        return config
    }
)

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    if (res.data.code&&res.data.code !== 0) { // 逻辑性错误
      return Promise.reject(res.data.error)
    }

    if (res.data.status >= 400 && res.data.status < 500) {//程序性错误
      router.push('/login')
      return Promise.reject(res.data)
    }

    return res  // 响应的内容没有问题直接返回
  }
  // ,
  // (error) => { 
  //   // 程序性错误
  //   // 如果状态码是4开头的，就认为用户没有权限
  //   if (error.response.status >= 400 && error.response.status < 500) {
  //     router.push('/login')
  //   }
  //   return Promise.reject(error.response.data.error)
  // }
)


export function post(url, body) {
  return axios.post(url, body)
}