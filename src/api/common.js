/*
 * @Author: your name
 * @Date: 2020-01-09 14:09:21
 * @LastEditTime : 2020-01-10 10:52:49
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

export function getNewsCategory() {
  return request({
    url: '/newsCategory/all',
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
export function createNews(data) {
  return request({
    url: '/create_news',
    method: 'post',
    data
  })
}
