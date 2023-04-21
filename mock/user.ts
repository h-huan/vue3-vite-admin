/*
 * @Author: h-huan
 * @Date: 2023-03-24 16:36:16
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-21 16:03:29
 * @Description: 
 */
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login', 
    method: 'post',
    response: () => {
      return {
        code: 200,
        status: "success",
      }
    }
  },
] as MockMethod[];