/*
 * @Author: your name
 * @Date: 2020-01-08 18:31:03
 * @LastEditTime: 2020-01-09 13:56:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\api\login.js
 */
import request from '@/utils/request'

export function loginByUsername(ac, se) {
  const data = {
    ac,
    se
  }
  return request({
    url: '/token/app',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/thirdapp/getUserInfo',
    method: 'get',
    params: { token }
  })
}

