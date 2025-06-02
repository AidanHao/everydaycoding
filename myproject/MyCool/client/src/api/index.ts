import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

interface ApiResponse<T = any> {
    code: string
    msg: string
    data: T
}

// 封装axios将相应的功能封装好
const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000, // 添加超时时间
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从 localStorage 获取 token
        const userTokenStr = localStorage.getItem('userToken')
        if (userTokenStr) {
            try {
                const userToken = JSON.parse(userTokenStr)
                if (config.headers) {
                    // 添加 Bearer 前缀
                    config.headers.Authorization = `Bearer ${userToken.jsonToken}`
                }
            } catch (error) {
                console.error('Token parsing error:', error)
                // 清除无效的 token
                localStorage.removeItem('userToken')
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const { data } = response

        // 处理业务状态码
        switch (data.code) {
            case '8000':
                // ElMessage.success(data.msg || '请求成功')
                return response
            case '8004':
                // 未授权或 token 失效
                ElMessage.error(data.msg || '登录已过期，请重新登录')
                // 清除 token
                localStorage.removeItem('userToken')
                // 跳转到登录页
                router.push('/login')
                return Promise.reject(new Error(data.msg))
            default:
                ElMessage.error(data.msg || '请求失败')
                return Promise.reject(new Error(data.msg))
        }
    },
    (error) => {
        if (error.response) {
            const { status } = error.response
            switch (status) {
                case 401:
                    ElMessage.error('登录已过期，请重新登录')
                    localStorage.removeItem('userToken')
                    router.push('/login')
                    break
                case 403:
                    ElMessage.error('没有权限访问该资源')
                    break
                case 404:
                    ElMessage.error('请求的资源不存在')
                    break
                case 500:
                    ElMessage.error('服务器错误')
                    break
                default:
                    ElMessage.error(error.message || '请求失败')
            }
        } else if (error.request) {
            // 请求已发出但没有收到响应
            ElMessage.error('网络错误，请检查您的网络连接')
        } else {
            // 请求配置出错
            ElMessage.error('请求配置错误')
        }
        return Promise.reject(error)
    }
)

// 封装请求方法
const request = {
    get<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
        return instance.get(url, { params })
    },
    post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
        return instance.post(url, data)
    },
    put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
        return instance.put(url, data)
    },
    delete<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
        return instance.delete(url, { params })
    }
}

export default request 