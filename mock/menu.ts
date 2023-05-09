/*
 * @Author: h-huan
 * @Date: 2023-05-09 14:48:30
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 14:52:42
 * @Description: 
 */


import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    // 获取菜单
    url: '/api/hhuan/menu/getMenuList', 
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: "success",
        data: [
          { text: '首页', icon: "icon-shouye", url: "/dashboard" },
          {
            text: '系统管理', icon: "icon-shezhi", url: "", childrens: [
              { name: '用户管理', icon: "icon-yonghu", url: "" },
              { name: '角色管理', icon: "icon-role-list", url: "" },
              { name: '菜单管理', icon: "icon-caidan1", url: "" },
              { name: '字典管理', icon: "icon-caidan1", url: "" }
            ]
          },
          { text: '图标库', icon: "icon-caidan", url: "", },
          { text: '组件管理', icon: "icon-caidan", url: "", }
        ]
      }
    }
  },
] as MockMethod[];