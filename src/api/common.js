/*
 * @Author: your name
 * @Date: 2020-01-09 14:09:21
 * @LastEditTime : 2020-01-09 17:20:04
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\api\common.js
 */
import request from '@/utils/request'

export function getCatories() {
  return request({
    url: '/category/all',
    method: 'get'
  })
}

export function createActivity(data) {
  return request({
    url: '/create_activity',
    method: 'post',
    data
  })
}
