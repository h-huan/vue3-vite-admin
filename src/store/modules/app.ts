/*
 * @Author: h-huan
 * @Date: 2023-04-17 15:04:56
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 15:24:25
 * @Description: 
 */
import { Module } from "vuex"
import { RootState } from "../type"
import Cookies from 'js-cookie'

export interface LangState {
  activeLang?: string,
  sidebar?: boolean
}

export const App: Module<LangState, RootState> = {
  namespaced: true,
  state: (): LangState => ({
    sidebar: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
  }),
  mutations: {
    TOGGLE_SIDEBAR:(state)=>{
      state.sidebar = !state.sidebar
      if (state.sidebar) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    }
  },
  actions:{
    toggleSideBar:({ commit })=>{
      commit('TOGGLE_SIDEBAR')
    }
  }
}
