/*
 * @Author: h-huan
 * @Date: 2023-03-24 17:06:08
 * @LastEditors: h-huan
 * @LastEditTime: 2023-03-24 17:08:19
 * @Description: 
 */

//引入axios
import axios from 'axios'

//创建axios实例
axios.defaults.baseURL="";//基准地址
 // 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
//添加请求拦截器
axios.interceptors.request.use((config)=>{
    //在发送请求之前做些什么
    return config
},(error)=>{
    //对请求错误做些什么
    return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use((response)=>{
    //对响应数据做些什么
    return response
},(error)=>{
    //对响应错误做些什么
    return Promise.reject(error)
})

//导出
export default axios