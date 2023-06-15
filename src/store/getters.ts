/*
 * @Author: h-huan
 * @Date: 2023-05-09 16:15:09
 * @LastEditors: h-huan
 * @LastEditTime: 2023-06-15 15:30:33
 * @Description: 
 */
/*
 * @Author: h-huan
 * @Date: 2023-05-09 16:03:13
 * @LastEditors: h-huan
 * @LastEditTime: 2023-05-09 16:05:25
 * @Description: 
 */

const getters = {
  token: state => state.User.token,
  roles: state => state.User.roles,
  user: state => state.User.user,
  sidebar: state => state.App.sidebar,
  visitedViews: state => state.TagsView.visitedViews,
  cachedViews: state => state.TagsView.cachedViews
}

export default getters
