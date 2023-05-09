/*
 * @Author: h-huan
 * @Date: 2023-05-09 14:46:20
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 14:47:52
 * @Description: 
 */


import request from '/@/utils/request'

/**
 * @description: 获取验证吗
 * @param {*} data
 * @return {*}
 */
export const getMenuList = () => {
  return request({
    url: "/api/hhuan/menu/getMenuList",
    method: 'get',
  })
}