/*
 * @Author: h-huan
 * @Date: 2023-04-17 15:06:51
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-17 17:12:49
 * @Description: 
 */

import { RootProps } from "./user/index";
import { LangState} from "./test/index";

export interface RootState {
  User: RootProps
  Test: LangState
}
