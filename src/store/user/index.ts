/*
 * @Author: h-huan
 * @Date: 2023-04-17 15:01:17
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-18 16:29:23
 * @Description: 
 */

import { Module } from "vuex"
import { RootState } from "../type"
import { getToken, setToken, removeToken } from '/@/utils/auth'
// import { login, getInfo, logout } from '@/api/login'
import { md5 } from '/@/utils/encrypt'


// 定义 用户接口
export interface UserProps {
  loginName: string;
  password: string;
}

// 定义 store根接口
export interface RootProps {
  token: string;
  user: UserProps;
  loadMenus: Boolean;
  roles: Array<any>
  
}

// loginName: '',
// password: '',
// verification: '',

// 通过泛型传入 rootProps 
export const User: Module<RootProps, RootState> = {
  namespaced: true,
  state: {
    token: getToken(),
    roles: [],
    loadMenus: false,
    user: {
      loginName: "",
      password: ""
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
       // 保存token
        setToken(md5(userInfo.loginName), rememberMe)
        commit('SET_TOKEN', md5(userInfo.loginName))

        // setUserInfo(res.user, commit)
        setUserInfo(userInfo, commit)
        // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
        // commit('SET_LOAD_MENUS', true);
  
    },
    // 获取用户信息
    // GetInfo({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(res => {
    //       setUserInfo(res, commit)
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 退出
    LogOut({ commit }) {
      console.log(1);
      
     
      return  logOut(commit)
    },
  },
  getters: {}
};

// 退出登录
export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

// 没有权限默认设置一个
export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res.user)
}