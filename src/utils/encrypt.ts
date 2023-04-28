/*
 * @Author: h-huan
 * @Date: 2023-04-17 11:24:52
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-17 11:59:46
 * @Description: 
 */


// 引入crypto模块
import CryptoJS from 'crypto-js'

/**
 * @description: md5
 * @param {*} str
 * @return {*}
 */

export const md5 = str => CryptoJS.MD5(str).toString().toLowerCase()
// 规定使用哈希算法中的MD5算法

