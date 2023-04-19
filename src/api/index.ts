/*
 * @Author: h-huan
 * @Date: 2023-03-24 17:30:06
 * @LastEditors: h-huan
 * @LastEditTime: 2023-03-24 17:49:49
 * @Description: 
 */
import axios from '@/utils/axios'

export class indeDemo {

  /**
   * @description: 查询总条数
   */
  static async login() {
    return await axios({
      url: "/api/toLogin",
      method: 'get',
    })
  }
}