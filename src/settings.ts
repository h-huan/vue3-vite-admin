/*
 * @Author: h-huan
 * @Date: 2023-04-20 17:08:27
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-20 17:09:34
 * @Description: 
 */



export default {
  /**
   * @description 网站标题
   */
  title: 'hh-admin',
  /**
   * @description 是否显示 tagsView
   */
  tagsView: false,
  /**
   * @description 固定头部
   */
  fixedHeader: false,
  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 1,
  /**
   * @description token key
   */
  TokenKey: 'HHTOKEN',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 5000,
  /**
   * @description 是否显示logo
   */
  sidebarLogo: true,
  /**
   * 是否显示设置的底部信息
   */
  showFooter: false,
  /**
   * 底部文字，支持html语法
   */
  footerTxt: '',
  /**
   * 备案号
   */
  caseNumber: ''
} 