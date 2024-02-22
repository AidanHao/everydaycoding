import axios from 'axios'
import { showSuccessToast, showFailToast } from 'vant';


axios.defaults.baseURL = 'http://localhost:3000'//设置基本地址，不能修改
axios.defaults.headers.post['Content-Type'] = 'application/json'//post请求参数在body里面，这里就是一个通知

//响应拦截
axios.interceptors.response.use(res=>{//res代表response响应体
    if(res.status!==200)//请求体和响应体里面一定有status状态码
    {//程序错误，vant框架可以直接引用，可以直接当函数使用
        showFailToast('连接失败，服务端异常');
    }else{
        //判断是否是逻辑错误
        if(res.data.code!=='8000'){//逻辑性错误
            // 只要是body返回的值，外面一定会包裹一层data
            showFailToast(res.data.msg);
            return Promise.reject(res)//reject是可以这样用的，当你只要用到reject时就这么干 
            // Promise.reject(res)
            // return res.data
        }else{
            //封装的地方不要写业务逻辑
            //登录成功
            // showSuccessToast(res.data.msg)
            return res.data
        }
    }
})

export default axios
