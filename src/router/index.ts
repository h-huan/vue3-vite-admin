/*
 * @Author: h-huan
 * @Date: 2023-03-25 11:58:23
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 17:15:16
 * @Description: 
 */
import { createRouter, createWebHashHistory, RouterOptions, Router } from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
import {routes} from "./router";
import { close, start } from '/@/utils/nprogress'
import { getToken } from '/@/utils/auth'
// import { usrGetters } from "vuex"
import { store } from '/@/store'

const whiteList = ['/login']// no redirect whitelist

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
}

// Router是路由对象类型
const router: Router = createRouter(options)

router.beforeEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + "admin"
  }
  start()
  
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      close()
      return { path: '/' } // 相当于next() 
    }else{
      
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('User/GetInfo').then((res) => { // 拉取user_info
          // 动态路由，拉取菜单
          // loadMenus(next, to)
        }).catch(() => {
          store.dispatch('User/LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        // store.dispatch('updateLoadMenus')
        // loadMenus(next, to)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) == -1) {
      close()
      // 从定向到登录页
      return { path: `/login?redirect=${to.fullPath}` }
    }
  }
})

router.afterEach(() => {
  close()
})

// export const loadMenus = (next, to) => {
//   buildMenus().then(res => {
//     const sdata = JSON.parse(JSON.stringify(res))
//     const rdata = JSON.parse(JSON.stringify(res))
//     const sidebarRoutes = filterAsyncRouter(sdata)
//     const rewriteRoutes = filterAsyncRouter(rdata, false, true)
//     rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

//     store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
//       router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
//       next({ ...to, replace: true })
//     })
//     store.dispatch('SetSidebarRouters', sidebarRoutes)
//   })
// }


export default router