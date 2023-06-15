/*
 * @Author: h-huan
 * @Date: 2023-03-27 09:07:46
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-15 09:28:02
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
        name: 'Test',
        path: '/test',
        component: () => import('/@/views/test/index.vue'),
        meta: { title: '测试', icon: 'dashboard', affix: false }
      },
      {
        name: 'Components',
        path: '/components',
        component: () => import('/@/views/components/index.vue'),
        meta: { title: '组件', icon: 'dashboard', affix: false }
      }
    ]
  },
]