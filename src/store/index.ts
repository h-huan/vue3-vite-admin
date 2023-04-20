/*
 * @Author: h-huan
 * @Date: 2023-04-17 14:34:22
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-17 17:15:17
 * @Description: 
 */

import { InjectionKey } from "@vue/runtime-core"
import { createStore,Store,useStore as baseUseStore } from "vuex";
import { User } from "./user/index";
import { store as test} from "./test/index";


//定义 RootState接口，将所有模块类型放入
import { RootState } from "./type";


export const key: InjectionKey<Store<RootState>> = Symbol()

// 通过泛型传入 rootProps 
export const store: Store<RootState> = createStore({
  modules: { User, test }
})

export function useStore() {
  return baseUseStore(key)
}