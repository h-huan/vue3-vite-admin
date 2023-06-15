/*
 * @Author: h-huan
 * @Date: 2023-04-17 14:34:22
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-14 09:50:11
 * @Description: 
 */

import { InjectionKey } from "@vue/runtime-core"
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { User } from "./modules/user";
import { App } from "./modules/app";
import getters from "./getters";
import { TagsView } from "./modules/tagsView";
import { Permission } from "./modules/permission";

//定义 RootState接口，将所有模块类型放入
import { RootState } from "./type";


export const key: InjectionKey<Store<RootState>> = Symbol()

// 通过泛型传入 rootProps 
export const store: Store<RootState> = createStore({
  modules: { User, App, TagsView, Permission },
  getters
})

export function useStore() {
  return baseUseStore(key)
}