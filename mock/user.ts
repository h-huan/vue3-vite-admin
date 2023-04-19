/*
 * @Author: h-huan
 * @Date: 2023-03-24 16:36:16
 * @LastEditors: h-huan
 * @LastEditTime: 2023-03-24 17:40:35
 * @Description: 
 */
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/toLogin', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: "success",
        data: {
          person_id: 123456,
          person_name: "管理员"
        }
      }
    }
  },
] as MockMethod[];