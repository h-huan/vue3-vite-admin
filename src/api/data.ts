/*
 * @Author: h-huan
 * @Date: 2023-04-28 09:27:12
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-28 09:27:12
 * @Description: 
 */
/*
 * @Author: h-huan
 * @Date: 2023-04-23 10:22:42
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-24 17:02:49
 * @Description: 
 */
import request from '/@/utils/request'
import qs from 'qs'

export function initData(url:string , params: object) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * @description: 获取本地json
 * @param {*} url
 * @return {*}
 */
export function getJson(url) {
  return request({
    url: url,
    method: 'get',
  })
}
