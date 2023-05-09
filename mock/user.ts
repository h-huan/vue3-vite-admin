/*
 * @Author: h-huan
 * @Date: 2023-03-24 16:36:16
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 17:37:14
 * @Description: 
 */
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/hhuan/login', 
    method: 'post',
    response: () => {
      return {
        code: 200,
        status: "success",
      }
    }
  },
  {
    url: '/mock/hhuan/info', 
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: "success",
        data: {
          loginName: "admin",
          password: "123456",
          roles:[]
        }
      }
    }
  },
] as MockMethod[];