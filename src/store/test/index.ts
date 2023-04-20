/*
 * @Author: h-huan
 * @Date: 2023-04-17 15:04:56
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-17 15:15:00
 * @Description: 
 */
import { Module } from "vuex"
import { RootState } from "../type"
export interface LangState {
  activeLang: string
}

export const store: Module<LangState, RootState> = {
  namespaced: true,
  state: (): LangState => ({
    activeLang: "",
  }),
  mutations: {
    changeLang(state: LangState, lang: string) {
      state.activeLang = lang
    },
  },
}
