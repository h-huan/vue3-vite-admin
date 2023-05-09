/*
 * @Author: h-huan
 * @Date: 2023-05-09 15:47:45
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 15:50:42
 * @Description: 
 */

import { Module } from "vuex"
import { RootState } from "../type"


export interface TagsViewState {
  visitedViews?: Array<any>,
}

export const TagsView: Module<TagsViewState, RootState> = {
  namespaced: true,
  state: (): TagsViewState => ({
    visitedViews: [],
  }),
  mutations: {
    TOGGLE_SIDEBAR:(state)=>{
     
    }
  },
  actions:{
    toggleSideBar:({ commit })=>{
      commit('TOGGLE_SIDEBAR')
    }
  }
}
