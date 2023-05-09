/*
 * @Author: h-huan
 * @Date: 2023-03-24 17:06:08
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 15:55:46
 * @Description: 
 */

import { getToken } from '/@/utils/auth'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'
import {store} from '/@/store/index'

import router from '../router/index'

//引入axios
import axios from 'axios'


//创建axios实例
axios.defaults.baseURL= process.env.NODE_ENV === 'production' ? process.env.VITE_BASE_API : '/';//基准地址
 // 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
//添加请求拦截器
axios.interceptors.request.use((config)=>{
    if (getToken()) {
        config.headers['aiToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      config.headers['Content-Type'] = 'application/json'
    //在发送请求之前做些什么
    return config
},(error)=>{
    //对请求错误做些什么
    return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use((response)=>{
    //对响应数据做些什么
    return response.data
},(error)=>{
    console.log(error);
  
    //对响应错误做些什么
    if (error.response instanceof Blob && error.response.type.toLowerCase().indexOf('json') !== -1) {
        const reader = new FileReader()
        reader.readAsText(error.response, 'utf-8')
        reader.onload = function(e) {
          // const errorMsg = JSON.parse(reader.result).message
          // ElNotification.error({
          //   title: errorMsg,
          //   duration: 5000
          // })
        }
      } else {
        let code = 0
        try {
          code = error.response.data.status
        } catch (e) {
          if (error.toString().indexOf('Error: timeout') !== -1) {
            ElNotification.error({
              title: '网络请求超时',
              duration: 5000
            })
            return Promise.reject(error)
          }
        }
        if (code) {
          if (code === 401) {
            store.dispatch('User/LogOut').then(() => {
              // 用户登录界面提示
              Cookies.set('point', 401)
              location.reload()
            })
          } else if (code === 403) {
            router.push({ path: '/401' })
          } else {
            const errorMsg = error.response.data.message
            if (errorMsg !== undefined) {
                ElNotification.error({
                title: errorMsg,
                duration: 5000
              })
            }
          }
        } else {
            ElNotification.error({
            title: '接口请求失败',
            duration: 5000
          })
        }
      }
    return Promise.reject(error)
})

//导出
export default axios