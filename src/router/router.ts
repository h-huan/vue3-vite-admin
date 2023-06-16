/*
 * @Author: h-huan
 * @Date: 2023-03-27 09:07:46
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-16 14:21:15
 * @Description: 
 */

import { RouteRecordRaw } from "vue-router";
import Layout from '/@/components/Layout/indve.vue'

export enum RouteName {
  Home = 'home',
  Article = 'article-detail',
  CategoryFlow = 'category-flow',
  TagFlow = 'tag-flow',
  DateFlow = 'date-flow',
  SearchFlow = 'search-flow',
  Archive = 'archive',
  Guestbook = 'guestbook',
  About = 'about',
  Lens = 'lens',
  App = 'app',
  Nft = 'nft',
  Sponsor = 'sponsor',
  Error = 'error'
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => import('/@/views/features/redirect.vue', resolve)
      }
    ]
  },
  {
    path: '/404',
    component: () => import('/@/views/features/404.vue'),
  },
  {
    path: '/401',
    component: () => import('/@/views/features/401.vue'),
  },
  {
    name: RouteName.Home,
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: () => import('/@/views/home/index.vue'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        name: 'System',
        path: '/system',
        component: () => import('/@/views/system/index.vue'),
        meta: { title: '系统设置' },
        redirect: '/user',
        // redirect: { name: 'systemMenu' },
        children: [
          {
            path: '/user',
            component: () => import('/@/views/system/user/index.vue'),
            name: 'user',
            meta: { title: '用户设置' },
          },
          {
            path: '/role',
            component: () => import('/@/views/system/role/index.vue'),
            name: 'role',
            meta: { title: '角色设置' },
          },
          {
            path: '/menu',
            component: () => import('/@/views/system/menu/index.vue'),
            name: 'menu',
            meta: { title: '菜单设置' },
          },
          // {
          //   path: '/system/dept',
          //   component: () => import('/@/views/system/dept/index.vue'),
          //   name: 'dept',
          //   meta: { title: '部门管理' },
          // },
          // {
          //   path: '/system/job',
          //   component: () => import('/@/views/system/job/index.vue'),
          //   name: 'job',
          //   meta: { title: '岗位' },
          // },
          {
            path: '/dict',
            component: () => import('/@/views/system/dict/index.vue'),
            name: 'dict',
            meta: { title: '菜单设置' },
          },
        ]
      },
      {
        name: 'Test',
        path: '/test',
        component: () => import('/@/views/test/index.vue'),
        meta: { title: '测试', icon: 'dashboard', affix: false }
      },
      {
        name: 'Components',
        path: '/components',
        redirect: '/MarkDow',
        meta: { title: '组件' },
        children: [
          {
            name: 'MarkDown',
            path: '/MarkDown',
            component: () => import('/@/views/components/MarkDown/index.vue'),
            meta: { title: 'MarkDown', affix: false }
          }
        ]
      }
    ]
  },
]