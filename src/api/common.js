/*
 * @Author: your name
 * @Date: 2020-01-09 14:09:21
 * @LastEditTime : 2020-01-17 19:59:25
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

export function createOrUpdateAbout(data) {
  return request({
    url: '/about/createOrUpdate',
    method: 'post',
    data
  })
}

export function getAbout() {
  return request({
    url: '/about/get',
    method: 'get'
  })
}

export function getActivityTypeAll() {
  return request({
    url: '/activityType/all',
    method: 'get'
  })
}

export function getActivityTypeByAdmin() {
  return request({
    url: '/activityType/admin',
    method: 'get'
  })
}

export function getActivityTypeCategory() {
  return request({
    url: '/activityType/category',
    method: 'get'
  })
}
