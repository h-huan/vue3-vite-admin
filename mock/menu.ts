/*
 * @Author: h-huan
 * @Date: 2023-05-09 14:48:30
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-30 16:52:51
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
          {
            id: '1',
            title: '首页',
            icon: "icon-shouye",
            url: "/dashboard",
            menuSort: 1,
            component: '/system',
            hidden: '0',
            createTime: '2023-06-01'
          },
          {
            id: '2',
            title: '系统管理',
            icon: "icon-shezhi",
            url: '/system',
            menuSort: 1,
            component: '/system',
            hidden: '0',
            createTime: '2023-06-01',
            hasChildren: true,
            childrens: [
              {
                id: '21',
                title: '用户管理',
                icon: "icon-yonghu",
                url: "/user",
                menuSort: 1,
                component: '/system',
                hidden: '0',
                createTime: '2023-06-01',
              },
              {
                id: '22',
                title: '角色管理',
                icon: "icon-role-list",
                url: "/role",
                menuSort: 1,
                component: '/system',
                hidden: '0',
                createTime: '2023-06-01',
              },
              {
                id: '23',
                title: '菜单管理',
                icon: "icon-caidan1",
                url: "/menu",
                menuSort: 1,
                component: '/system',
                hidden: '0',
                createTime: '2023-06-01',
              },
              {
                id: '24',
                title: '字典管理',
                icon: "icon-caidan1",
                url: "/dict",
                menuSort: 1,
                component: '/system',
                hidden: '0',
                createTime: '2023-06-01',
              }
            ]
          },
          {
            id: '3',
            title: '图标库',
            icon: "icon-caidan",
            url: "/icon",
            menuSort: 1,
            component: '/system',
            hidden: '0',
            createTime: '2023-06-01',
          },
          {
            id: '4',
            title: '组件管理',
            icon: "icon-caidan",
            url: '/components',
            menuSort: 1,
            component: '/system',
            hidden: '0',
            createTime: '2023-06-01',
            hasChildren: true,
            childrens: [
              {
                title: 'MarkDown',
                icon: "icon-yonghu1",
                url: "/MarkDown",
                menuSort: 1,
                component: '/system',
                hidden: '0',
                createTime: '2023-06-01',
              },
            ]
          },
          {
            id: '5',
            title: '表单管理',
            icon: "icon-caidan",
            url: "/form",
            menuSort: 1,
            component: '/system',
            hidden: '0',
            createTime: '2023-06-01',
          },
          {
            id: '6',
            title: 'VUE文档',
            icon: "icon-caidan",
            url: "/test",
            menuSort: 1,
            component: '/system',
            hidden: '0',
            createTime: '2023-06-01',
          },
        ]
      }
    }
  },
] as MockMethod[];