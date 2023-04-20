/*
 * @Author: h-huan
 * @Date: 2023-04-20 17:08:02
 * @LastEditors: h-huan
 * @LastEditTime: 2023-04-20 17:08:07
 * @Description: 
 */
import Cookies from 'js-cookie'
import Config from '/@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}