/*
 * @Author: h-huan
 * @Date: 2023-03-24 17:30:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-28 09:38:33
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
    url: "/api/login",
    method: 'POST',
    data
  })
}
