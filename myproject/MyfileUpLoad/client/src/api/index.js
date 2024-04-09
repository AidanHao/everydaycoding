import axios from 'axios'

// 封装axios将相应的功能封装好
axios.defaults.baseURL = 'http://localhost:3000'//基本机制
axios.defaults.headers.post['Content-Type'] = 'application/json'//post请求参数在body里面，这里就是一个通知


// 响应拦截
axios.interceptors.response.use(res=>{
    if(res.status!=200){
        console.log('连接失败服务器异常');
    }else{
        //判断是否有逻辑错误
        if(res.data.code!='8000'){
            console.log(res.data.msg);
            return Promise.reject(res)
        }else{
            return res.data
        }
    }
})

export default axios