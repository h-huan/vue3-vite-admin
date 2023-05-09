/*
 * @Author: h-huan
 * @Date: 2023-04-17 15:06:51
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 15:50:35
 * @Description: 
 */

import { RootProps } from "./modules/user";
import { LangState} from "./modules/app";
import { TagsViewState} from "./modules/tagsView";

export interface RootState {
  User: RootProps
  App: LangState
  TagsView: TagsViewState
}
