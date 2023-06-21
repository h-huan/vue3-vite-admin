// /mock/hhuan/table/getTableLists


import request from '/@/utils/request'

/**
 * @description: 获取验证吗
 * @param {*} data
 * @return {*}
 */
export const getUserList = () => {
  return request({
    url: "/mock/hhuan/table/getTableLists",
    method: 'get',
  })
}