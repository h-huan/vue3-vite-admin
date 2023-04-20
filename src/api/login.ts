/*
 * @Author: h-huan
 * @Date: 2023-03-24 17:30:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-20 17:34:41
 * @Description: 
 */
import axios from '@/utils/axios'

/**
 * @description: 登录
 * @param {*} data
 * @return {*}
 */
export const login = (data) => {
  return axios({
    url: "/inquiry/component/login/com_usrLoginV1.i",
    method: 'POST',
    data
  })
}