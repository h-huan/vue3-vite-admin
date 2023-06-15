/*
 * @Author: h-huan
 * @Date: 2023-04-17 15:06:51
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-13 17:36:05
 * @Description: 
 */

import { RootProps } from "./modules/user";
import { LangState } from "./modules/app";
import { TagsViewState } from "./modules/tagsView";
import { PermissionState } from "./modules/permission";

export interface RootState {
  User: RootProps
  App: LangState
  TagsView: TagsViewState
  Permission: PermissionState
}
