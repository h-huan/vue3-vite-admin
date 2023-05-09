/*
 * @Author: h-huan
 * @Date: 2023-03-24 17:30:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 16:36:00
 * @Description: 
 */
import request from '/@/utils/request'

/**
 * @description: 获取验证吗
 * @param {*} data
 * @return {*}
 */
export const getValidateCode = (data) => {
  return request({
    url: "",
    method: 'POST',
    data
  })
}

/**
 * @description: 登录
 * @param {*} data 用户信息
 * @return {*}
 */
export const login = (data) => {
  return request({
    url: "/api/hhuan/login",
    method: 'POST',
    data
  })
}


/**
 * @description: 获取用户信息
 * @return {*}
 */
export const getInfo = ()=> {
  return request({
    url: '/api/hhuan/info',
    method: 'get'
  })
}