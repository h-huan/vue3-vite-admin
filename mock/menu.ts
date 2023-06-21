/*
 * @Author: h-huan
 * @Date: 2023-05-09 14:48:30
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-21 16:32:59
 * @Description: 
 */


import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    // 获取菜单
    url: '/mock/hhuan/menu/getMenuList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        status: "success",
        data: [
          { text: '首页', icon: "icon-shouye", url: "/dashboard" },
          {
            text: '系统管理', icon: "icon-shezhi", url: '/system', childrens: [
              { name: '用户管理', icon: "icon-yonghu", url: "user" },
              { name: '角色管理', icon: "icon-role-list", url: "/role" },
              { name: '菜单管理', icon: "icon-caidan1", url: "/menu" },
              { name: '字典管理', icon: "icon-caidan1", url: "/dict" }
            ]
          },
          { text: '图标库', icon: "icon-caidan", url: "", },
          {
            text: '组件管理', icon: "icon-caidan", url: '/components', childrens: [
              { name: 'MarkDown', icon: "icon-yonghu1", url: "/MarkDown" },
            ]
          },
          { text: '表单管理', icon: "icon-caidan", url: "/form", },
          { text: 'VUE文档', icon: "icon-caidan", url: "/test", },
        ]
      }
    }
  },
] as MockMethod[];