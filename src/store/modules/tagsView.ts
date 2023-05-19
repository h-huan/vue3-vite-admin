/*
 * @Author: h-huan
 * @Date: 2023-05-09 15:47:45
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 17:59:23
 * @Description: 
 */

import { Module } from "vuex"
import { RootState } from "../type"


export interface TagsViewState {
  visitedViews?: Array<any>,
  cachedViews?: Array<any>,
}

export const TagsView: Module<TagsViewState, RootState> = {
  namespaced: true,
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: []
  }),
  mutations: {
    
  },
  actions:{
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
  }
}
