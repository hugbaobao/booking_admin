import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message, notification } from 'ant-design-vue'
import router from '@/router/router'

// 不带data
interface Result {
  code: number
  msg: string
}
// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T
}

const baseUrl = 'https://php.ryxq.com.cn'
// const baseUrl = 'http://127.0.0.1:8000'

enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}

const config = {
  // 默认地址
  baseURL: baseUrl as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    //     this.service.interceptors.request.use(
    //       (config: any) => {
    //         const token = sessionStorage.getItem('token') || ''
    //         config.headers.Authorization = `Bearer ${token}`
    //         return config
    //       },
    //       (error: AxiosError) => {
    //         // 请求报错
    //         message.error('请求发生错误！')
    //         Promise.reject(error)
    //       },
    //     )
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */

    //     this.service.interceptors.response.use(
    //       (response: AxiosResponse) => {
    //         return response
    //       },
    //       (error: AxiosError) => {
    //         message.error('登录身份过期！请重新登录')
    //         router.replace({
    //           path: '/login',
    //         })
    //         const { response } = error
    //         if (response) {
    //           this.handleCode(response.status)
    //         }
    //         if (!window.navigator.onLine) {
    //           message.error('网络连接失败')
    //           // 可以跳转到错误页面，也可以不做操作
    //           return router.replace({
    //             path: '/error',
    //           })
    //         }
    //         return Promise.reject(error)
    //       },
    //     )
  }
  handleCode(code: number): void {
    switch (code) {
      case 600:
        message.error('登录身份过期！请重新登录')
        break
      default:
        message.error('请重新登录')
        break
    }
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default new RequestHttp(config)
