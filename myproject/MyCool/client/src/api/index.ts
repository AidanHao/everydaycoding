import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { h } from 'vue'
import { ElMessage } from 'element-plus'

interface ApiResponse<T = any> {
  code: string
  msg: string
  data: T
}

// 封装axios将相应的功能封装好
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = sessionStorage.getItem('userToken')
  if (token) {
    const userInfo = JSON.parse(token)
    if (config.headers) {
      config.headers.Authorization = userInfo.token
    }
  }
  return config
})

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    if (response.status !== 200) {
      console.log('连接失败服务器异常')
      return Promise.reject(new Error('连接失败服务器异常'))
    } else {
      // 判断是否有逻辑错误
      if (response.data.code !== '8000') {
        ElMessage({
          showClose: true,
          message: response.data.msg,
          type: 'error'
        })
        return Promise.reject(response)
      } else {
        return response
      }
    }
  },
  (error) => {
    ElMessage({
      showClose: true,
      message: error.message || '请求失败',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default instance 